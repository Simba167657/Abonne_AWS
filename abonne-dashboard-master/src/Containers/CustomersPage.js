import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../utils/request';

function CustomersPage() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState({ data: [], searching: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request({ method: 'GET', url: '/customers' })
      .then(res => {
        const originData = [];
        for (const c of res.data.Customers) {
          originData.push({
            key: c.id,
            name: c.name,
            whatsappNumber: c.whatsAppNumber
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

  const onSearch = e => {
    const text = e.target.value;
    const searchResult = [];

    for (const customer of data) {
      if (customer.name.toLowerCase().includes(text.toLowerCase()) || customer.whatsappNumber.includes(text)) {
        searchResult.push(customer);
      }
    }

    setSearch({ data: searchResult, searching: text.length > 0 });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'WhatsApp Number',
      dataIndex: 'whatsappNumber',
      key: 'age',
      width: '10%'
    }
  ];

  return (
    <Table
      title={() => <Input.Search onChange={onSearch}></Input.Search>}
      columns={columns}
      dataSource={search.searching ? search.data : data}
      loading={loading}
      bordered
    />
  );
}

export default CustomersPage;
