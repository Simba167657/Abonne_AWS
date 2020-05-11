import { Button, Divider, Form, Input, message, Popconfirm, Spin, Table, Tabs, Tag } from 'antd';
import React, { useEffect } from 'react';
import UpdateAdminModal from '../Components/UpdateAdminModal';
import request from './../utils/request';
const { TabPane } = Tabs;

const AccountPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    request({ method: 'POST', url: '/admin/create', data: values })
      .then((res) => {
        form.resetFields();
        setLoading(false);
        message.success('Admin created successfully!', 5);
      })
      .catch((err) => {
        setLoading(false);
        message.error('Username is already taken', 5);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const DeleteAdmin = (id) => {
    request({ method: 'DELETE', url: `admin/${id}` })
      .then(() => message.success('driver deleted successfully', 5))
      .catch(() => message.error('error deleting driver', 5));
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (
        <span>
          <Tag color={record.role === 'OWNER' ? 'volcano' : 'geekblue'} key={record.key}>
            {record.role.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span style={{ display: 'flex' }}>
          <UpdateAdminModal record={record} />
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => DeleteAdmin(record.key)}>
            <Button type="link" size="small" style={{ color: 'red' }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    request({ method: 'GET', url: '/admins' })
      .then((res) => {
        const originData = [];
        for (const user of res.data) {
          originData.push({
            key: user.id,
            name: user.name,
            username: user.username,
            mobileNumber: user.mobileNumber,
            role: user.role,
          });
        }
        setData(originData);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <Tabs tabPosition="left" type="card">
      <TabPane tab="Register" key="1">
        <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} className="account-form">
          <Spin spinning={loading}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input a name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input a mobile number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input a username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input a password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Submit
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </TabPane>
      <TabPane tab="Moderators" key="2">
        <Table columns={columns} dataSource={data} bordered loading={loading} />
      </TabPane>
    </Tabs>
  );
};

export default AccountPage;
