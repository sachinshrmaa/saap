import { Button, Col, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/getUserDetails";

export default function TeacherDashboard() {
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Col span={24} className="py-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg mb-0">Teachers Dashboard</h1>
          <div>
            <Link to="/teacher/log-attendance">
              <Button type="primary">Log Attendance</Button>
            </Link>
          </div>
        </div>

        <div className="grid py-6">
          <div className="bg-slate-100 border rounded-lg p-6">
            <h1 className="font-bold">Teacher Details</h1>
            <div className="mt-3">
              <p>Name: {localStorage.getItem("name")}</p>
              <p>Email: {localStorage.getItem("email")}</p>
            </div>
          </div>
        </div>
      </Col>
    </div>
  );
}
