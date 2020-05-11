import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

function EmailsPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request({ method: 'GET', url: '/emails' })
      .then(res => {
        const originData = [];
        for (const c of res.data.emails) {
          originData.push({
            key: c.id,
            email: c.email,
            date: new Date(c.date).toLocaleString()
          });
        }

        setData(originData);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%'
    }
  ];

  return <Table columns={columns} dataSource={data} loading={loading} bordered />;
}

export default EmailsPage;
