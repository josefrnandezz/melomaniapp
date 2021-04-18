import '../../assets/homepage.css';

import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Navbar } from '@melomaniapp/ui';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import React from 'react';

const { Header, Content, Footer } = Layout;

const mockedOptions = [
  {
    key: 'home',
    title: 'Home',
    icon: <HomeOutlined />,
  },
  {
    key: 'search',
    title: 'Search',
    icon: <SearchOutlined />,
  },
  {
    key: 'notifications',
    title: 'Notifications',
    icon: <BellOutlined />,
  },
  {
    key: 'events',
    title: 'My events',
    icon: <CarryOutOutlined />,
  },
];

export const HomePage = () => (
  <Layout>
    <Navbar options={mockedOptions} />
    <Content
      className="site-layout"
      style={{ padding: '0 50px', marginTop: 64 }}
    >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default HomePage;
