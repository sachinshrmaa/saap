import { Col, Menu, Row } from "antd";
import React from "react";

export default function TeacherDashboard() {
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
  return (
    <div className="container mx-auto my-6">
      <Row gutter={15}>
        <Col span={5}>
          <Menu
            onClick={() => {}}
            style={{
              width: "100%",
            }}
            mode="vertical"
            items={items}
          />
        </Col>
        <Col span={19} className="py-3">
          <h1>Teacher Dashboard</h1>
        </Col>
      </Row>
    </div>
  );
}
