import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';
import { ExtractFormUpdatedValues } from './../utils/index';
import auth from './auth';

const TripInfo = (props) => {
  const { record, currentKey } = props;
  const [form] = Form.useForm();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(record.roundTrip);
  const { Option } = Select;

  const onFinish = (values) => {
    // extract updates
    if (!record.moderator) {
      values['moderator'] = auth.id;
      values['status'] = 'PROCESSING';
    }
    if (values.start_at) {
      values.start_at = moment(values.start_at).format('YYYY-MM-DD HH:mm');
    }
    if (!values.one_way) {
      values['waiting_hours'] = 0;
    }
    if (values.hours || values.minutes) {
      values['duration'] = values.hours * 60 + values.minutes;
    }
    const updates = ExtractFormUpdatedValues(values);
    console.log({ updates });

    // apply updates
    setLoading(true);
    request({ method: 'PUT', url: '/trip', data: { tripId: record.key, updates } })
      .then((res) => {
        message.success('Trip updated!', 5);
        setLoading(false);
      })
      .catch((err) => {
        message.error('Error updating Trip!', 5);
        setLoading(false);
      });

    // update status

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnChange = (checked) => {
    setChecked(checked);
  };

  useEffect(() => {
    request({ method: 'GET', url: '/drivers' })
      .then((res) => {
        const rawData = [];
        for (const driver of res.data.drivers) {
          rawData.push({
            key: driver.id,
            name: driver.firstName + ' ' + driver.lastName,
            mobileNumber: driver.mobileNumber,
          });
        }
        setDrivers(rawData);
      })
      .catch((err) => console.log(err));
  }, []);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 8,
    },
  };
  return (
    <div style={{ margin: 0 }}>
      <Form form={form} {...layout} layout="horizontal" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Customer Name" name="customer_name">
          <Input />
        </Form.Item>
        <Form.Item label="WhatsApp Number" name="whatsapp_number">
          <Input />
        </Form.Item>

        <Form.Item label="Start At" name="start_at">
          <DatePicker showTime={{ format: 'HH:mm' }} />
        </Form.Item>

        <Form.Item label="From Address" name="from_address">
          <Input />
        </Form.Item>
        <Form.Item label="To Address" name="to_address">
          <Input />
        </Form.Item>

        <Form.Item label="Round Trip" name="one_way">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={checked}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item label="Waiting Hours" name="waiting_hours">
          <InputNumber disabled={!checked} />
        </Form.Item>

        <Form.Item label="Duration">
          <Input.Group>
            <Form.Item
              name="hours"
              rules={[
                {
                  required: currentKey === 'NEW',
                  message: 'Please add hours or zero!',
                },
              ]}
            >
              <InputNumber placeholder="Hours" />
            </Form.Item>

            <Form.Item
              name="minutes"
              rules={[
                {
                  required: currentKey === 'NEW',
                  message: 'Please add minute or zero!',
                },
              ]}
            >
              <InputNumber placeholder="Minutes" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Assign Driver"
          name="driver"
          rules={[
            {
              required: currentKey === 'NEW',
              message: 'Please assign a driver!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {drivers &&
              drivers.map((driver) => (
                <Option value={driver.key} key={driver.key}>
                  {driver.name + ' | ' + driver.mobileNumber}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TripInfo;
