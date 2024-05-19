import { Col, Row } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";

export default function NotFound() {
  return (
    <Row className="container mx-auto py-[50px]">
      <Col span={24}>
        <h1 className="text-center font-xl text-xl mb-4">
          404 Page not found!
        </h1>
        <Link href="/" className="text-center">
          <p>Go back to home</p>
        </Link>
      </Col>
    </Row>
  );
}
