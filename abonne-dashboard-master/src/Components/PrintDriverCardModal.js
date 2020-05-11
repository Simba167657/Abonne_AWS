import { Avatar, Button, Card, ConfigProvider, Descriptions, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

const DriverCard = ({ visible, onCancel, record }) => {
  const [driver, setDriver] = useState([]);
  useEffect(() => {
    request({ method: 'GET', url: `driver/${record.driver}` })
      .then(res => setDriver([res.data]))
      .catch(err => console.log(err));
  }, [record]);

  return (
    <ConfigProvider direction="rtl">
      <Modal
        footer={null}
        closable={false}
        visible={visible}
        onCancel={onCancel}
        // style={{ direction: 'rtl' }}
        width="40%"
      >
        {driver.length && (
          <Card
          // cover={<img alt="driver face" src={driver.length ? driver[0].photo.url : ''} style={{ height: '50vh' }} />}
          >
            <Descriptions title="بيانات الرحلة" bordered size="small">
              <Descriptions.Item label="عنوان المغادرة" span={2}>
                {record.fromAddress}
              </Descriptions.Item>
              <Descriptions.Item label="عنوان الوصول" span={1}>
                {record.toAddress}
              </Descriptions.Item>

              <Descriptions.Item label="التاريخ" span={2}>
                {record.startDay}
              </Descriptions.Item>
              <Descriptions.Item label="الوقت" span={1}>
                {record.startTime}
              </Descriptions.Item>

              <Descriptions.Item label="ذهاب و عودة" span={2}>
                {record.roundTrip ? 'نعم' : 'لا'}
              </Descriptions.Item>
              {record.roundTrip && (
                <Descriptions.Item label="عدد الساعات" span={1}>
                  {record.waitingHours}
                </Descriptions.Item>
              )}
            </Descriptions>

            <br />

            <Descriptions title="بيانات العميل" bordered size="small">
              <Descriptions.Item label="الأسم" span={2}>
                {record.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الواتس أب" span={1}>
                {record.whatsAppNumber.replace('+2', '')}
              </Descriptions.Item>
            </Descriptions>

            <br />

            <Descriptions title="بيانات السائق" bordered size="small">
              <Descriptions.Item label="الأسم" span={3}>
                {driver[0].firstName + ' ' + driver[0].lastName[0]}
              </Descriptions.Item>
              <Descriptions.Item label="الصورة" span={2}>
                <Avatar src={driver[0].photo.url} size={250} shape="square"></Avatar>
              </Descriptions.Item>
            </Descriptions>

            <br />

            <Descriptions title="بيانات السيارة" bordered size="small">
              <Descriptions.Item label="النوع" span={2}>
                {driver[0].car.make}
              </Descriptions.Item>
              <Descriptions.Item label="الموديل" span={1}>
                {driver[0].car.model}
              </Descriptions.Item>
              <Descriptions.Item label="سنه الصنع" span={2}>
                {new Date(driver[0].car.yearOfManufacture).getUTCFullYear()}
              </Descriptions.Item>
              <Descriptions.Item label="اللون" span={1}>
                {driver[0].car.color}
              </Descriptions.Item>
              <Descriptions.Item label="رقم السيارة" span={2}>
                {driver[0].car.licenseNumber}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Modal>
    </ConfigProvider>
  );
};

const PrintDriverCardModal = ({ record }) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  return (
    <div>
      <Button type="primary" size="small" onClick={toggle}>
        Card
      </Button>

      <DriverCard visible={visible} onCancel={toggle} record={record} />
    </div>
  );
};

export default PrintDriverCardModal;
