import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import request from '../utils/request';

const UpdateForm = ({ visible, onCreate, onCancel, loading, record }) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch((info) => console.log('Validate Failed:', info));
  };

  return (
    <Modal
      confirmLoading={loading}
      visible={visible}
      title="Update Admin"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
      style={{ minWidth: '30%' }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Mobile Number" name="mobileNumber">
          <Input />
        </Form.Item>
        <Form.Item label="New Password" name="password">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateAdminModal = (record) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);

    setLoading(true);
    request({ method: 'PUT', url: `/admin/${record.record.key}`, data: values })
      .then((res) => {
        setLoading(false);
        message.success('Admin updated successfully', 5);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.error, 2);
      });
  };

  const toggle = () => setVisible(!visible);

  return (
    <div>
      <Button type="link" size="small" onClick={toggle}>
        Edit
      </Button>

      <UpdateForm visible={visible} onCreate={onCreate} onCancel={toggle} loading={loading} record={record} />
    </div>
  );
};

export default UpdateAdminModal;
