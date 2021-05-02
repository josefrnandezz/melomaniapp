import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Header, Navbar } from '@melomaniapp/ui';
import { Layout as AntLayout } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

const { Content } = AntLayout;

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

export interface LayoutProps {
  session?: Session;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  children,
}) => {
  if (!session) {
    return <h1>Error</h1>;
  }

  return (
    <AntLayout>
      <Navbar options={mockedOptions} />
      <AntLayout style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
