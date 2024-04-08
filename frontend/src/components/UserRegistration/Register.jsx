import React from "react";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

// Register component
const Register = () => {
  // Destructure values from useSignUp hook
  const { loading, error, registerUser } = useSignUp();

  // Function to handle registration
  const handleRegister = (values) => {
    registerUser(values); // Call registerUser function from hook
  };
  return (
    <Card className="form-container">
      <Flex>
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join now!
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name.",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name.",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address.",
                },
                {
                  type: "email",
                  message: "Email is invalid",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password.",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please re-enter your password.",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your password"
              />
            </Form.Item>
            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}
            <Form.Item>
              <Button
                type={`${loading ? "" : "primary"}`}
                color="gray"
                htmlType="submit"
                size="large"
                className="btn-primary"
              >
                {loading ? <Spin /> : "Create Account"}
              </Button>
              <Link to="/login">
                <Button size="large" className="btn">
                  Sign In
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
