import { Button, Col, Menu, Row } from "antd";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function TeacherDashboardLayout() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: "Dashboard",
    },
    {
      key: "2",
      label: "Students",
    },
    {
      key: "3",
      label: "Subjects",
    },
    {
      key: "4",
      label: "Batches",
    },
  ];

  const handleNavigation = (e) => {
    if (e.key === "1") {
      navigate("/teacher/dashboard");
    }
  };
  return (
    <div>
      <nav className="bg-slate-200 py-4 px-14">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg mb-0">SAAP Teachers Portal</h1>
          <div>
            <Link to="/login" className="text-blue-700">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Row gutter={15}>
          <Col span={5} className="py-4">
            <Menu
              onClick={handleNavigation}
              style={{
                width: "100%",
                height: "100vh",
              }}
              mode="vertical"
              items={items}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["1"]}
            />
          </Col>
          <Col span={19} className="py-3">
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}
