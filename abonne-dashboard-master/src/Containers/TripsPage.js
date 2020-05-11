import { Tabs } from 'antd';
import React, { Fragment } from 'react';
import TripTable from '../Components/TripTable';

const { TabPane } = Tabs;
const TripsPage = () => {
  const [currentKey, setKey] = React.useState('NEW');

  return (
    <Fragment>
      <Tabs type="card" tabPosition="left" style={{ float: 'left' }} onChange={key => setKey(key)}>
        <TabPane tab="All New Trips" key="NEW">
          {currentKey === 'NEW' && <TripTable currentKey={currentKey} />}
        </TabPane>
        <TabPane tab="My Trips (Scheduled)" key="PROCESSING">
          {currentKey === 'PROCESSING' && <TripTable currentKey={currentKey} />}
        </TabPane>
        <TabPane tab="Ongoing Trips (Started)" key="ONGOING">
          {currentKey === 'ONGOING' && <TripTable currentKey={currentKey} />}
        </TabPane>
        <TabPane tab="All Completed Trips" key="COMPLETED">
          {currentKey === 'COMPLETED' && <TripTable currentKey={currentKey} />}
        </TabPane>
        <TabPane tab="Canceled Trips" key="CANCELED">
          {currentKey === 'CANCELED' && <TripTable currentKey={currentKey} />}
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

export default TripsPage;
