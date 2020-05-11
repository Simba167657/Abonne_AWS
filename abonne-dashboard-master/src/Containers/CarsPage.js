import { Alert, Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

const CarsPage = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [alert, setAlert] = React.useState({ message: '', type: '' });

  useEffect(() => forceUpdate({}), []);

  const onFinish = values => {
    form.resetFields();
    request({ method: 'POST', url: '/car', data: values })
      .then(res => {
        setAlert({ type: 'success', message: res.data.success });
      })
      .catch(err => {
        setAlert({ type: 'error', message: err.response.data.message });
        console.log(err.response.data.error);
      });
  };

  return (
    <div>
      <Form form={form} name="add a new car model" layout="inline" onFinish={onFinish}>
        <Form.Item name="make" rules={[{ required: true, message: 'please input a car make' }]}>
          <Input placeholder="Car make"></Input>
        </Form.Item>

        <Form.Item name="model" rules={[{ required: true, message: 'please input a car model' }]}>
          <Input placeholder="Car model"></Input>
        </Form.Item>

        <Form.Item name="minimumYears" rules={[{ required: true, message: 'please input a car minimum year' }]}>
          <Input placeholder="Car minimum year"></Input>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
      <br />
      {alert.message !== '' && (
        <Alert
          message={alert.message}
          type={alert.type}
          style={{ minWidth: '250px', marginBottom: '1rem' }}
          closable
          showIcon
        />
      )}
    </div>
  );
};

export default CarsPage;
