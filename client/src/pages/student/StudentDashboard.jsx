import { Bar } from "@ant-design/plots";
import { Col, Row, Form, Select, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  { subject: "Major Project", value: 98 },
  { subject: "Internship", value: 85 },
];

export default function StudentDasboard() {
  const config = {
    data,
    xField: "subject",
    yField: "value",
    shapeField: "hollow",
    colorField: "subject",
    legend: {
      color: { size: 80, autoWrap: true, maxRows: 3, cols: 6 },
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
            <p>Name: Sachin Sharma</p>
            <p>Roll No: 20CSEC33</p>
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
