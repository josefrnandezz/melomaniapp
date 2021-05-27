import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
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
  {
    key: 'management',
    title: 'Management',
    icon: <SettingOutlined />,
    href: '/management',
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
        <AntLayout
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Header />
          <Content
            style={{ height: '100%', margin: '24px', overflow: 'initial' }}
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
