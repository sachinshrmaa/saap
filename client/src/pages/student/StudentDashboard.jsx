// import { Bar } from "@ant-design/plots";
import { Bar } from "@ant-design/charts";
import { Col, Row, Form, Select, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentDasboard() {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudentAttendance();
  }, []);

  const fetchStudentAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/attendance/attendance",
        { withCredentials: true }
      );

      let tempData = [];

      res.data.forEach((item) => {
        let tempObj = {
          subject_name: item.subject_name,
          attendance_percentage: (
            (item.present / item.total_classes) *
            100
          ).toFixed(2),
        };
        tempData.push(tempObj);
      });

      setStudentAttendance(tempData);

      console.log(tempData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const config = {
    data: studentAttendance,
    xField: "subject_name",
    yField: "attendance_percentage",
    colorField: "subject_name",
    legend: {
      color: { size: 100, autoWrap: true, maxRows: 3, cols: 6 },
    },
  };

  return (
    <div className="container mx-auto my-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg mb-0">Student Dashboard</h1>
        <div>
          <Link to="/login" className="text-blue-700">
            Logout
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 py-10">
        <div className="bg-slate-100 border rounded-lg p-6">
          <h1 className="font-bold">Student Details</h1>
          <div className="mt-3">
            <p>Name: {localStorage.getItem("name")}</p>
            <p>Sem: 8</p>
            <p>Batch: 2020-2024</p>
          </div>
        </div>
        <div className="bg-slate-100 border rounded-lg p-6">
          <h1 className="font-bold">Select Subjects</h1>
          <div className="mt-3">
            <Form layout="vertical">
              <Form.Item
                label="Select Subject"
                rules={[
                  {
                    required: true,
                    message: "Please select a subject!",
                  },
                ]}
              >
                <Select placeholder="Select Subject" />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-lg mb-4">Student Overall Attendance</h1>
      <Col span={24} className="mx-auto border rounded-lg mb-16">
        <Bar {...config} />
      </Col>
    </div>
  );
}
