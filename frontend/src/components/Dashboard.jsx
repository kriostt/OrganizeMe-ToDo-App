import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, Button, Card, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Dashboard component
const Dashboard = () => {
  // Using authentication context to access user data and logout function
  const { userData, logout } = useAuth();

  // Function to handle logout
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} />
        <Typography.Title level={2} strong className="username">
          {userData.firstName} {userData.lastName}
        </Typography.Title>
        <Typography.Text type="secondary" strong>
          Email: {userData.email}
        </Typography.Text>
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;
