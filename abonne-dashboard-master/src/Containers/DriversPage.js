import { Divider, Form, Input, message, Popconfirm, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import CreateDriverModal from '../Components/CreateDriverModal';
import request from './../utils/request';

const DriversPage = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState({ data: [], searching: false });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    request({ method: 'GET', url: '/drivers' })
      .then((res) => {
        const rawData = [];
        for (const driver of res.data.drivers) {
          rawData.push({
            key: driver.id,
            firstname: driver.firstName,
            lastname: driver.lastName,
            mobile: driver.mobileNumber,
            whatsapp: driver.whatsAppNumber,
            residence: driver.cityOfResidence.arabicName,
            destination: driver.favoriteDestinateion.arabicName,
            birthday: moment(driver.dateOfBirth).format('YYYY-MM-DD'),
            photo: driver.photo.url,
            nationalId: driver.nationalId.url,
            license: driver.license.url,
            carPhoto: driver.car.frontPhoto.url,
            carLicenseFront: driver.car.licenseFront.url,
            carLicenseBack: driver.car.licenseBack.url,
            car: `
            ${driver.car.make} ${driver.car.model} ${new Date(driver.car.yearOfManufacture).getFullYear()} ${
              driver.car.color
            }
            `,
          });
        }
        setData(rawData);
        setLoading(false);
      })
      .catch((err) => message.error('Error getting drivers!', 5));
  }, []);

  const deleteRow = (key, mobile, e) => {
    e.preventDefault();
    setLoading(true);
    request({ method: 'delete', url: 'driver', data: { mobile } })
      .then(() => {
        const newData = data.filter((row) => row.key !== key);
        setData(newData);
        setLoading(false);
        message.success('Driver deleted!', 5);
      })
      .catch((err) => {
        message.error('Error deleting driver!', 5);
        setLoading(false);
      });
  };

  const onSearch = (e) => {
    const text = e.target.value;
    const searchResult = [];

    for (const driver of data) {
      if (
        driver.firstname.toLowerCase().includes(text.toLowerCase()) ||
        driver.lastname.toLowerCase().includes(text.toLowerCase()) ||
        driver.car.toLowerCase().includes(text.toLowerCase()) ||
        driver.residence.toLowerCase().includes(text.toLowerCase()) ||
        driver.destination.toLowerCase().includes(text.toLowerCase()) ||
        driver.mobile.includes(text) ||
        driver.whatsapp.includes(text)
      ) {
        searchResult.push(driver);
      }
    }

    setSearch({ data: searchResult, searching: text.length > 0 });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'WhatsApp',
      dataIndex: 'whatsapp',
    },
    {
      title: 'Residence',
      dataIndex: 'residence',
      sorter: (a, b) => a.residence.localeCompare(b.residence),
    },
    {
      title: 'Favorite Destination',
      dataIndex: 'destination',
      sorter: (a, b) => a.destination.localeCompare(b.destination),
    },
    {
      title: 'Car',
      dataIndex: 'car',
      sorter: (a, b) => a.car.localeCompare(b.car),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <span>
          <Link to={`/driver/${record.key}`} target="_blank">
            Profile
          </Link>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={(e) => deleteRow(record.key, record.mobile, e)}>
            <a href="!#" style={{ color: 'red' }}>
              Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <CreateDriverModal />
      <br />
      <br />
      <Form form={form} component={false}>
        <Table
          title={() => <Input.Search onChange={onSearch}></Input.Search>}
          bordered
          dataSource={search.searching ? search.data : data}
          columns={columns}
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default DriversPage;
