import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { CustomRoute } from './Components/CustomRoute';
import { Header } from './Components/Header';
import { ProtectedComponent } from './Components/ProtectedComponent';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { Sidebar } from './Components/Sidebar';
import AccountPage from './Containers/AccountPage';
import CarsPage from './Containers/CarsPage';
import CustomersPage from './Containers/CustomersPage';
import DriverPage from './Containers/DriverPage';
import DriversPage from './Containers/DriversPage';
import EmailsPage from './Containers/EmailsPage';
import HomePage from './Containers/HomePage';
import LoginPage from './Containers/LoginPage';
import NotFoundPage from './Containers/NotFoundPage';
import TripsPage from './Containers/TripsPage';

function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [style, setStyle] = React.useState('layout-content');
  const toggleSider = () => setCollapsed(!collapsed);
  const { Content } = Layout;

  return (
    <div>
      <Layout className="App">
        <ProtectedComponent component={Sidebar} collapsed={collapsed} />
        <Layout>
          <ProtectedComponent component={Header} collapsed={collapsed} toggleSider={toggleSider} />
          <Content className={style}>
            <Switch>
              <CustomRoute path="/login" component={LoginPage} setStyle={setStyle} />
              <ProtectedRoute exact path="/" component={HomePage} setStyle={setStyle} />
              <ProtectedRoute exact path="/drivers" component={DriversPage} />
              <ProtectedRoute exact path="/customers" component={CustomersPage} />
              <ProtectedRoute exact path="/emails" component={EmailsPage} />
              <ProtectedRoute path="/driver/:id" component={DriverPage} />
              <ProtectedRoute path="/trips" component={TripsPage} />
              <ProtectedRoute path="/cars" component={CarsPage} />
              <ProtectedRoute path="/account" component={AccountPage} owner />
              <Route path="/*" component={NotFoundPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
