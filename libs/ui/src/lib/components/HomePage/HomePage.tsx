import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Navbar, ProfileSwitcher } from '@melomaniapp/ui';
import { Avatar, Layout, Menu } from 'antd';
import React, { Children } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const mockedProfiles = {
  profiles: {
    artistProfiles: [
      {
        username: 'peggygou',
        displayName: 'Peggy Gou',
      },
      {
        username: 'santandave',
        displayName: 'Dave',
      },
    ],
    establishmentProfiles: [
      {
        username: 'komoost',
        displayName: 'OOST',
      },
    ],
  },
};

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
    <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          content
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default HomePage;
