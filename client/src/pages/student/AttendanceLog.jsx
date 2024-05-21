import { Button, Form, Select, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function AttendanceLog() {
  const columns = [
    {
      key: "subject",
      title: "Subject",
      dataIndex: "subject",
    },
    {
      key: "attendance",
      title: "Attendance",
      dataIndex: "attendance",
    },
  ];

  const data = [
    {
      key: "1",
      subject: "Maths",
      attendance: "89%",
    },
    {
      key: "2",
      subject: "Science",
      attendance: "75%",
    },
  ];
  return (
    <div className="container mx-auto my-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg mb-0">Student Dashboard</h1>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <nav className="my-5">
        <Link
          to="/student/dashboard"
          className="text-blue-500 hover:text-blue-700"
        >
          ← back to dashboard
        </Link>
      </nav>

      <div className="bg-slate-100 rounded-lg border px-6 py-2 mt-6">
        <div className="mt-3">
          <Form layout="vertical">
            <Row gutter={20}>
              <Col span={8}>
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
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button type="primary" className="mt-[30px] px-6">
                    Submit{" "}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <div className="my-10">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
