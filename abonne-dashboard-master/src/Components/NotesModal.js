import { Button, Form, List, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

const NotesForm = ({ visible, onCreate, onCancel, loading, record }) => {
  const [form] = Form.useForm();
  const [notes, setNotes] = useState([]);
  const trip = record.record;

  useEffect(() => {
    request({ method: 'GET', url: `/notes?trip=${trip.key}` })
      .then(res => setNotes(res.data.notes))
      .catch(err => console.log(err));
  }, [trip]);

  const onOk = () => {
    form
      .validateFields()
      .then(values => {
        onCreate(values);
      })
      .catch(info => console.log('Validate Failed:', info));
  };

  return (
    <Modal
      confirmLoading={loading}
      visible={visible}
      title="Notes"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
      style={{ minWidth: '30%' }}
    >
      <List size="small" bordered dataSource={notes} renderItem={item => <List.Item>{item.note}</List.Item>} />
      <br />
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item
          name="note"
          label="New Note"
          rules={[
            {
              required: true,
              message: 'Please add a note!'
            }
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const NotesModal = record => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    const { key, driver, whatsAppNumber } = record.record;
    const data = { trip: key, driver, customer: whatsAppNumber, note: values.note };

    setLoading(true);
    request({ method: 'POST', url: '/notes', data })
      .then(res => {
        setLoading(false);
        message.success('Note saved', 5);
      })
      .catch(err => {
        setLoading(false);
        message.error(err.response.data.message);
      });
  };

  const toggle = () => setVisible(!visible);

  return (
    <div>
      <Button type="dashed" size="small" onClick={toggle}>
        Notes
      </Button>

      <NotesForm visible={visible} onCreate={onCreate} onCancel={toggle} loading={loading} record={record} />
    </div>
  );
};

export default NotesModal;
