import React, { useState } from "react";
import { Col, Form, Input, Row, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, notificationHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        payload
      );
      if (res.data.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/student/dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      notification.error({
        type: "error",
        content: "Invalid crendentials! Please try again.",
      });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Row className="container mx-auto">
      {notificationHolder}
      <Col
        span={10}
        className="bg-slate-100 mx-auto px-6 py-8 rounded-md mt-20 "
      >
        <h1 className="font-semibold text-lg text-center mb-3">
          Welcome Back, Login
        </h1>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" placeholder="Email" allowClear />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" allowClear />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
