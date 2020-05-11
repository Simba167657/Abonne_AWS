import {
  CarOutlined,
  ClusterOutlined,
  MailOutlined,
  TableOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import auth from './auth';

export const Sidebar = props => {
  const { collapsed } = props;

  return (
    auth.isAuthenticated && (
      <Layout.Sider trigger={null} collapsible collapsed={collapsed} className="home-page">
        <div className="logo">
          <img src={logo} style={{ width: '80%' }} alt="abonne logo" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <TableOutlined />
            <span>Drivers</span>
            <Link to="/drivers" />
          </Menu.Item>
          <Menu.Item key="2">
            <UsergroupAddOutlined />
            <span>Customers</span>
            <Link to="/customers" />
          </Menu.Item>
          <Menu.Item key="3">
            <MailOutlined />
            <span>Emails</span>
            <Link to="/emails" />
          </Menu.Item>
          <Menu.Item key="4">
            <ClusterOutlined />
            <span>Trips</span>
            <Link to="/trips" />
          </Menu.Item>
          <Menu.Item key="5">
            <CarOutlined />
            <span>Cars</span>
            <Link to="/cars" />
          </Menu.Item>
          {auth.role === 'OWNER' && (
            <Menu.Item key="6">
              <UserOutlined />
              <span>Account</span>
              <Link to="/account" />
            </Menu.Item>
          )}
        </Menu>
      </Layout.Sider>
    )
  );
};
