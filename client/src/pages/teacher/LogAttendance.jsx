import { Button, Col, Row, Form, Select, Table, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import axios from "axios";

const columns = [
  {
    key: "roolNo",
    title: "Roll No.",
    dataIndex: "roll_number",
  },
  {
    key: "studentName",
    title: "Student Name",
    dataIndex: "name",
  },
  Table.SELECTION_COLUMN,
];

export default function LogAttendance() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalStudentsCount, setTotalStudentsCount] = useState(null); // update this
  const [classRemark, setClassRemark] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [studentsDetail, setStudentsDetail] = useState([]);

  const [toastNotification, toastNotificationHolder] = message.useMessage();

  const handleSubmit = async () => {
    let absentStudents = [];
    selectedRows.forEach((student) => absentStudents.push(student.roll_number));

    let payload = {
      subjectCode,
      batchCode,
      absentStudents,
      remarks: classRemark,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/attendance/log",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      setIsSubmitting(false);
      toastNotification.success({
        type: "success",
        content: "Attendance marked successfully!",
      });
    } catch (error) {
      setIsSubmitting(false);
      toastNotification.error({
        type: "error",
        content: "Attendance marked failed!",
      });
      console.log(error);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const fetchStudents = async () => {
    let payload = {
      batchCode,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/students/list",
        payload,
        { withCredentials: true }
      );

      const studentsWithKeys = res.data.map((student) => ({
        ...student,
        key: student.id,
      }));

      setTotalStudentsCount(res.data.length);

      setStudentsDetail(studentsWithKeys);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastNotification.error({
        type: "error",
        content: "Students fetched failed!",
      });
      console.log(error);
    }
  };

  return (
    <div>
      {toastNotificationHolder}
      <Col span={24} className="py-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg mb-0">Log Attendance</h1>
        </div>

        <div className="bg-slate-100 rounded-lg border px-6 py-2 mt-4">
          <div className="mt-3">
            <Form layout="vertical">
              <Row gutter={20}>
                <Col span={10}>
                  <Form.Item
                    name="Select Batch"
                    label="Select Batch"
                    rules={[
                      {
                        required: true,
                        message: "Please select a batch!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Select Batch"
                      onChange={(value) => setBatchCode(value)}
                      options={[
                        { label: "20CSEC", value: "20CSEC" },
                        { label: "21CVLC", value: "21CVLC" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="Select Subject"
                    label="Select Subject"
                    rules={[
                      {
                        required: true,
                        message: "Please select a subject!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      disabled={!batchCode}
                      placeholder="Select Subject"
                      onChange={(value) => setSubjectCode(value)}
                      options={[{ label: "Maths", value: "BTCO-UG-221" }]}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="mt-[30px] px-6"
                      onClick={fetchStudents}
                    >
                      Start Logging
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <p className="my-4">Select the student to mark absent.</p>

        <div className="my-6">
          <Table
            columns={columns}
            dataSource={studentsDetail}
            rowSelection={rowSelection}
            pagination={false}
            loading={isLoading}
          />

          <div className="my-6">
            <Form layout="vertical">
              <Form.Item
                label="Class Remarks"
                value={classRemark}
                name="remarks"
              >
                <TextArea onChange={(e) => setClassRemark(e.target.value)} />
              </Form.Item>
            </Form>
          </div>

          <div className="flex justify-between bg-slate-100 align-center p-6 rounded-lg border my-8">
            <div>
              <span className="mr-4">
                Present: {totalStudentsCount - selectedRows.length}
              </span>
              <span>Absent: {selectedRows.length} </span>
            </div>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </div>
        </div>
      </Col>
    </div>
  );
}
