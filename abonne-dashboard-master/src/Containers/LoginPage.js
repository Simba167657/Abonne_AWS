import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import React from 'react';
import auth from '../Components/auth';
import request from './../utils/request';

const LoginPage = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    request({ method: 'POST', url: '/admin/login', data: values })
      .then((res) => {
        const token = res.data.token;
        setLoading(false);
        auth.login(() => localStorage.setItem('token', token));
        props.history.push('/');
      })
      .catch((err) => {
        setLoading(false);
        form.resetFields();
        message.error('Invalid username or password', 5);
        console.log(err);
      });
  };

  return (
    <div className="login-form">
      <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Spin spinning={loading}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
              Log in
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </div>
  );
};

export default LoginPage;
