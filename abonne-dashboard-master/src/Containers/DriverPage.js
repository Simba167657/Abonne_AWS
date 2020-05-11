import { RotateLeftOutlined, RotateRightOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Modal, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import UpdateDriverModal from '../Components/UpdateDriverModal';
import request from './../utils/request';

const DriverPage = props => {
  const id = props.match.params.id;
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [previewImage, setImage] = useState('');
  const [previewVisible, setPreview] = useState(false);
  const [rotation, setRotation] = useState(0);

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation -= 360;
    }
    setRotation(newRotation);
  };
  const rotateLeft = () => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation -= 360;
    }
    setRotation(newRotation);
  };

  const handleCancel = () => setPreview(false);
  const handlePreview = url => {
    setImage(url);
    setPreview(true);
  };

  useEffect(() => {
    request({ method: 'GET', url: `/driver/${id}` })
      .then(res => setData([res.data]))
      .catch(err => console.log(err));

    request({ method: 'GET', url: `notes?driver=${id}` })
      .then(res => setNotes(res.data.notes))
      .catch(err => console.log(err));
  }, [id]);

  return data.length > 0 ? (
    <div>
      <Descriptions title="User Info" bordered className="driver-profile">
        <Descriptions.Item label="Name">{data[0].firstName + ' ' + data[0].lastName}</Descriptions.Item>
        <Descriptions.Item label="Mobile Number">{data[0].mobileNumber}</Descriptions.Item>
        <Descriptions.Item label="Whats App Number">{data[0].whatsAppNumber}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(data[0].dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="City of Residence">
          {data[0].cityOfResidence.arabicName + '  ' + data[0].cityOfResidence.englishName}
        </Descriptions.Item>
        <Descriptions.Item label="Favorite Destination">
          {data[0].favoriteDestinateion.arabicName + '  ' + data[0].favoriteDestinateion.englishName}
        </Descriptions.Item>
        <Descriptions.Item label="Notes" span={3}>
          {notes.map(note => (
            <div>
              {note.note}
              <br />
            </div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Photo">
          <img className="image" alt="face" src={data[0].photo.url} onClick={() => handlePreview(data[0].photo.url)} />
        </Descriptions.Item>
        <Descriptions.Item label="National ID">
          <img
            className="image"
            alt="national Id"
            src={data[0].nationalId.url}
            onClick={() => handlePreview(data[0].nationalId.url)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="License ID">
          <img
            className="image"
            alt="car license"
            src={data[0].license.url}
            onClick={() => handlePreview(data[0].license.url)}
          />
        </Descriptions.Item>
      </Descriptions>

      <br />

      <Descriptions title="Car Info" bordered className="driver-profile">
        <Descriptions.Item label="Model">
          {data[0].car.make +
            ' ' +
            data[0].car.model +
            ' ' +
            new Date(data[0].car.yearOfManufacture).getFullYear() +
            ' ' +
            data[0].car.color}
        </Descriptions.Item>
        <Descriptions.Item label="License Number">{data[0].car.licenseNumber}</Descriptions.Item>
        <Descriptions.Item label="License Expiration Date">
          {new Date(data[0].car.licenseExpiryDate).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Front Photo">
          <img
            className="image"
            alt="car front"
            src={data[0].car.frontPhoto.url}
            onClick={() => handlePreview(data[0].car.frontPhoto.url)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="License Front">
          <img
            className="image"
            alt="car license front"
            src={data[0].car.licenseFront.url}
            onClick={() => handlePreview(data[0].car.licenseFront.url)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="License Back">
          <img
            className="image"
            alt="car license back"
            src={data[0].car.licenseBack.url}
            onClick={() => handlePreview(data[0].car.licenseBack.url)}
          />
        </Descriptions.Item>
      </Descriptions>

      <br />

      <UpdateDriverModal record={data} />

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel} width="850px" closable={false}>
        <Row gutter={[48, 48]}>
          <Col span={12}>
            <Button
              onClick={rotateRight}
              type="primary"
              shape="circle"
              icon={<RotateRightOutlined />}
              size="large"
              style={{ float: 'left' }}
            />
          </Col>
          <Col span={12}>
            <Button
              onClick={rotateLeft}
              type="primary"
              shape="circle"
              icon={<RotateLeftOutlined />}
              size="large"
              style={{ float: 'right' }}
            />
          </Col>
          <Col span={24}>
            <img alt="face" src={previewImage} style={{ width: '100%', transform: `rotate(${rotation}deg)` }} />
          </Col>
        </Row>
      </Modal>
    </div>
  ) : (
    <Skeleton active paragraph={{ rows: 8 }} />
  );
};

export default DriverPage;
