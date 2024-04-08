import React from "react";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

// Login component
const Login = () => {
  // Destructure values from useLogin hook
  const { error, loading, loginUser } = useLogin();

  // Function to handle login
  const handleLogin = async (values) => {
    await loginUser(values); // Call loginUser function from hook
  };
  return (
    <Card className="form-container">
      <Flex>
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Sign In
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Login Here
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
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
                htmlType="submit"
                size="large"
                className="btn-primary"
              >
                {loading ? <Spin /> : "Sign In"}
              </Button>
              <Link to="/">
                <Button size="large" className="btn">
                  Create an account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Login;
