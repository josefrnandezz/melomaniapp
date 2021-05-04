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
    href: '/home',
  },
  {
    key: 'discover',
    title: 'Discover',
    icon: <SearchOutlined />,
    href: '/discover',
  },
  {
    key: 'notifications',
    title: 'Notifications',
    icon: <BellOutlined />,
    href: '/notifications',
  },
  {
    key: 'events',
    title: 'My events',
    icon: <CarryOutOutlined />,
    href: '/events',
  },
];

export interface LayoutProps {
  session?: Session;
  isFan: boolean;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  isFan,
  children,
}) => {
  if (!session) {
    return <h1>Error</h1>;
  }

  return (
    <AntLayout style={{ height: '100vh' }}>
      <Navbar options={mockedOptions} isFan={isFan} />
      <AntLayout>
        <Header />
        <AntLayout
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Content
            style={{ height: '100vh', margin: '24px', overflow: 'initial' }}
          >
            <div
              style={{ padding: 24, background: '#fff', textAlign: 'center' }}
            >
              {children}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;