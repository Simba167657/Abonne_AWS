import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import auth from "./auth";

export const Header = props => {
  const { toggleSider, collapsed } = props;
  const logout = e => {
    e.preventDefault();
    auth.logout(() => {
      localStorage.removeItem("token");
      props.history.push("/login");
    });
  };

  return (
    auth.isAuthenticated && (
      <Layout.Header style={{ background: "#fff", padding: 0 }} className="header">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: toggleSider
        })}
        <Menu theme="light" mode="horizontal" style={{ lineHeight: "63px", float: "right" }} className="account-menu">
          <Menu.SubMenu
            key="1"
            title={
              <span>
                <UserOutlined />
                {auth.user}
              </span>
            }
          >
            {auth.role === "OWNER" && (
              <Menu.Item key="1">
                <UserOutlined />
                <span>Account</span>
                <Link to="/account" />
              </Menu.Item>
            )}
            <Menu.Item key="2">
              <a onClick={logout} href="!#" target="_blank">
                <LogoutOutlined />
                <span>Logout</span>
              </a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    )
  );
};
