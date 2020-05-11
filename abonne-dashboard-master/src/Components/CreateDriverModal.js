import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, message, Modal, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

const { Option } = Select;

const DriverCreateForm = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [colors, setColors] = useState([]);

  const [files, setFiles] = useState({
    driverPhoto: null,
    nationalID: null,
    carFrontPhoto: null,
    driverLicensePhoto: null,
    carLicenseFront: null,
    carLicenseBack: null
  });

  useEffect(() => {
    request({ method: 'GET', url: '/cities' })
      .then(res => setCities(res.data.cities))
      .catch(err => console.log(err));

    request({ method: 'GET', url: '/cars/makes' })
      .then(res => setMakes(res.data.makes))
      .catch(err => console.log(err));

    request({ method: 'GET', url: '/cars/colors' })
      .then(res => setColors(res.data.colors))
      .catch(err => console.log(err));
  }, []);

  const onOk = () => {
    setFiles([]);
    form
      .validateFields()
      .then(values => {
        onCreate(values);
      })
      .catch(info => console.log('Validate Failed:', info));
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e.file;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onSelectMake = make => {
    form.resetFields(['carModel']);
    request({ method: 'GET', url: `/cars/models?make=${make}` })
      .then(res => {
        setModels(res.data.models);
      })
      .catch(err => console.log(err));
  };

  const onSelectModel = modelName => {
    const model = models.find(model => model.model === modelName);
    setYears(model.years);
  };

  const driverPhotoProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'driverPhoto',
    onRemove: file => {
      setFiles({ ...files, driverPhoto: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, driverPhoto: file });
      return false;
    },
    fileList: files.driverPhoto ? [files.driverPhoto] : []
  };
  const nationalIDProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'nationalID',
    onRemove: file => {
      setFiles({ ...files, nationalID: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, nationalID: file });
      return false;
    },
    fileList: files.nationalID ? [files.nationalID] : []
  };
  const carFrontPhotoProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'carFrontPhoto',
    onRemove: file => {
      setFiles({ ...files, carFrontPhoto: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, carFrontPhoto: file });
      return false;
    },
    fileList: files.carFrontPhoto ? [files.carFrontPhoto] : []
  };
  const driverLicensePhotoProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'driverLicensePhoto',
    onRemove: file => {
      setFiles({ ...files, driverLicensePhoto: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, driverLicensePhoto: file });
      return false;
    },
    fileList: files.driverLicensePhoto ? [files.driverLicensePhoto] : []
  };
  const carLicenseFrontProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'carLicenseFront',
    onRemove: file => {
      setFiles({ ...files, carLicenseFront: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, carLicenseFront: file });
      return false;
    },
    fileList: files.carLicenseFront ? [files.carLicenseFront] : []
  };
  const carLicenseBackProps = {
    listType: 'text',
    customRequest: dummyRequest,
    multiple: false,
    name: 'carLicenseBack',
    onRemove: file => {
      setFiles({ ...files, carLicenseBack: null });
    },
    beforeUpload: file => {
      setFiles({ ...files, carLicenseBack: file });
      return false;
    },
    fileList: files.carLicenseBack ? [files.carLicenseBack] : []
  };

  return (
    <Modal
      confirmLoading={loading}
      visible={visible}
      title="Create a new Driver"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
      style={{ minWidth: '60%' }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: 'Please input first name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please input last name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="dateOfBirth"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: 'Please input date of birth!'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cityOfResidence"
              label="City of Residence"
              rules={[{ required: true, message: 'Please select city!' }]}
            >
              <Select
                placeholder="Please select a city"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {cities.length &&
                  cities.map(city => (
                    <Option value={city.id} key={city.id}>
                      {city.arabicName + ' - ' + city.englishName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Form.Item
              name="phone"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: 'Please input mobile number!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="whatsappNumber"
              label="WhatsApp"
              rules={[
                {
                  required: true,
                  message: 'Please input whatsApp number'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="favouriteDestination"
              label="Favorite Destination"
              rules={[{ required: true, message: 'Please select city!' }]}
            >
              <Select
                placeholder="Please select a city"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {cities.length &&
                  cities.map(city => (
                    <Option value={city.id} key={city.id}>
                      {city.arabicName + ' - ' + city.englishName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              name="driverPhoto"
              label="Driver Photo"
              valuePropName="driverPhoto"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...driverPhotoProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nationalID"
              label="National ID"
              valuePropName="nationalID"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...nationalIDProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name="carMake"
              label="Car Make"
              rules={[{ required: true, message: 'Please select a car make' }]}
            >
              <Select
                placeholder="Please select a car make"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={onSelectMake}
                defaultActiveFirstOption
              >
                {makes.length &&
                  makes.map(make => (
                    <Option value={make} key={makes.indexOf(make)}>
                      {make}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carModel"
              label="Car Model"
              rules={[{ required: true, message: 'Please select car model' }]}
            >
              <Select
                disabled={models.length === 0}
                placeholder="Please select a car model"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={onSelectModel}
              >
                {models.length &&
                  models.map(model => (
                    <Option value={model.model} key={model.model}>
                      {model.model}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carYearOfManufacture"
              label="Year Of Manufacture"
              rules={[{ required: true, message: 'Please select car year of manufacture' }]}
            >
              <Select
                disabled={years.length === 0}
                placeholder="Please select car year of manufacture"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {years.length &&
                  years.map(year => (
                    <Option value={year} key={year}>
                      {year}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name="carColor"
              label="Car Color"
              rules={[{ required: true, message: 'Please select car color' }]}
            >
              <Select
                placeholder="Please select car color"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {colors.length &&
                  colors.map(color => (
                    <Option value={color.en_color} key={color.id}>
                      {color.en_color + ' - ' + color.ar_color}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carLicenseNumber"
              label="Car License Number"
              rules={[{ required: true, message: 'Please input car license number!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carLicenseExpire"
              label="Car License Expiry"
              rules={[{ required: true, message: 'Please input car license expiry!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Form.Item
              name="carFrontPhoto"
              label="Car Front Photo"
              valuePropName="carFrontPhoto"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...carFrontPhotoProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="driverLicensePhoto"
              label="Driver License Photo"
              valuePropName="driverLicensePhoto"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...driverLicensePhotoProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="carLicenseFront"
              label="Car License Front"
              valuePropName="carLicenseFront"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...carLicenseFrontProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="carLicenseBack"
              label="Car License Back"
              valuePropName="carLicenseBack"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload {...carLicenseBackProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const CreateDriverModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreate = (values, cb) => {
    console.log('Received values of form: ', values);
    const data = new FormData();
    for (const key in values) {
      data.append(key, values[key]);
    }
    setLoading(true);
    request({
      method: 'POST',
      url: 'driver',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': true
      }
    })
      .then(res => {
        setLoading(false);
        setVisible(false);
        message.success(res.data.success, 5);
      })
      .catch(err => {
        setLoading(false);
        message.error(err.response.data.message, 5);
      });
  };

  const toggle = () => setVisible(!visible);

  return (
    <div style={{ float: 'left' }}>
      <Row gutter={[48, 8]}>
        <Col span={12}>
          <Button type="primary" onClick={toggle} style={{ float: 'left', marginBottom: '1rem' }}>
            New Driver
          </Button>
        </Col>
      </Row>

      <DriverCreateForm visible={visible} onCreate={onCreate} onCancel={toggle} loading={loading} />
    </div>
  );
};

export default CreateDriverModal;
