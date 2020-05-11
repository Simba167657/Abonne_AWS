import { Button, Checkbox, Divider, Form, Input, message, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TimeConvert } from '../utils';
import request from '../utils/request';
import auth from './auth';
import NotesModal from './NotesModal';
import PrintDriverCardModal from './PrintDriverCardModal';
import TripInfo from './TripInfo';

const TripTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({ data: [], searching: false });
  const [loading, setLoading] = useState(false);
  const { currentKey } = props;

  let status = 'NEW';
  if (['PROCESSING', 'COMPLETED', 'ONGOING'].includes(currentKey)) {
    status = 'PROCESSING';
  }
  if (currentKey === 'CANCELED') {
    status = currentKey;
  }

  const onSearch = (e) => {
    const text = e.target.value;
    const searchResult = [];

    for (const trip of data) {
      if (
        trip.customerName.toLowerCase().includes(text.toLowerCase()) ||
        String(trip.driverName).toLowerCase().includes(text.toLowerCase()) ||
        String(trip.moderatorName).toLowerCase().includes(text.toLowerCase()) ||
        new Date(trip.startAt).toISOString().includes(text.toLowerCase()) ||
        trip.whatsAppNumber.includes(text)
      ) {
        searchResult.push(trip);
      }
    }

    setSearch({ data: searchResult, searching: text.length > 0 });
  };

  const onCancel = (record) => {
    const updates = { status: 'CANCELED' };
    request({ method: 'PUT', url: '/trip', data: { tripId: record.key, updates } })
      .then((res) => {
        message.success('Trip updated!', 5);
        setLoading(false);
      })
      .catch((err) => {
        message.error('Error updating Trip!', 5);
        setLoading(false);
        console.log(err.response);
      });
  };

  useEffect(() => {
    setLoading(true);
    request({ method: 'GET', url: `/trips?status=${status}` })
      .then((res) => {
        let rawData = [];
        for (const trip of res.data.trips) {
          const date = new Date(trip.trip_start_at.split('T')[0]);
          const time = trip.trip_start_at.split('T')[1].split('.')[0].split(':');
          date.setHours(time[0]);
          date.setMinutes(time[1]);

          rawData.push({
            key: trip.trip_id,
            customerName: trip.trip_customer_name,
            whatsAppNumber: trip.trip_whatsapp_number,
            startDay: trip.trip_start_at.split('T')[0],
            startTime: date.toLocaleTimeString().replace(':00 ', ' '),
            fromAddress: trip.trip_from_address,
            toAddress: trip.trip_to_address,
            roundTrip: trip.trip_one_way,
            waitingHours: trip.trip_waiting_hours || 0,
            duration: trip.trip_duration ? TimeConvert(trip.trip_duration) : trip.trip_duration,
            driver: trip.driver_id,
            driverName: trip.driver_first_name + ' ' + trip.driver_last_name,
            moderator: trip.moderator_id,
            moderatorName: trip.moderator_name,
            startAt: date.getTime(),
            endAt: trip.trip_duration !== null ? date.getTime() + trip.trip_duration * 60 * 1000 : null,
            status: trip.trip_status,
          });
        }

        if (currentKey === 'PROCESSING') {
          rawData = rawData.filter((trip) => trip.moderator === auth.id && trip.startAt > Date.now());
        }

        if (currentKey === 'ONGOING') {
          rawData = rawData.filter(
            (trip) =>
              trip.moderator === auth.id &&
              trip.startAt < Date.now() &&
              (trip.endAt === null || trip.endAt > Date.now())
          );
        }

        if (currentKey === 'COMPLETED') {
          rawData = rawData.filter((trip) => trip.endAt && trip.endAt < Date.now());
        }

        setData(rawData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentKey, status]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      width: 150,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'WhatsApp',
      dataIndex: 'whatsAppNumber',
      width: 130,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDay',
      width: 130,
      sorter: (a, b) => new Date(a.startDay) - new Date(b.startDay),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      width: 110,
    },
    {
      title: 'From Address',
      dataIndex: 'fromAddress',
      width: 200,
      sorter: (a, b) => a.fromAddress.localeCompare(b.fromAddress),
    },
    {
      title: 'To Address',
      dataIndex: 'toAddress',
      width: 200,
      sorter: (a, b) => a.toAddress.localeCompare(b.toAddress),
    },
    {
      title: 'Round Trip',
      dataIndex: 'roundTrip',
      width: 110,
      render: (value) => <Checkbox defaultChecked={value} disabled />,
    },
    {
      title: 'Waiting Hours',
      dataIndex: 'waitingHours',
      width: 140,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      width: 200,
    },
    {
      title: 'Moderator',
      dataIndex: 'moderatorName',
      width: 200,
      sorter: (a, b) => a.moderatorName.localeCompare(b.moderatorName),
    },
    {
      title: 'Actions',
      dataIndex: 'driver',
      width: 200,
      render: (id, record) => (
        <span style={{ display: 'flex' }}>
          <Link to={`/driver/${id}`} target="_blank" disabled={!id}>
            {id ? 'Driver' : ''}
          </Link>
          <Divider type="vertical" />
          {id && <PrintDriverCardModal record={record} />}
          <Divider type="vertical" />
          {!['CANCELED', 'COMPLETED', 'ONGOING'].includes(currentKey) && (
            <Popconfirm title="Sure to cancel?" onConfirm={() => onCancel(record)}>
              <Button type="danger" size="small">
                Cancel
              </Button>
            </Popconfirm>
          )}
          {currentKey === 'COMPLETED' && <Divider type="vertical" />}
          {currentKey === 'COMPLETED' && <NotesModal record={record} />}
        </span>
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        title={() => <Input.Search onChange={onSearch}></Input.Search>}
        bordered
        dataSource={search.searching ? search.data : data}
        columns={columns}
        loading={loading}
        expandable={{
          expandedRowRender: (record) =>
            currentKey !== 'COMPLETED' &&
            currentKey !== 'ONGOING' && <TripInfo record={record} currentKey={currentKey} />,
        }}
      />
    </Form>
  );
};

export default TripTable;
