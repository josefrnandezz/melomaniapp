import { Layout as AntLayout } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

import Header from '../Header/Header';
import Navbar, { NavbarOption } from '../Navbar/Navbar';

const { Content } = AntLayout;

export interface LayoutProps {
  session?: Session;
  isFan: boolean;
  navbarOptions: NavbarOption[];
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  isFan,
  children,
  navbarOptions,
}) => {
  if (!session) {
    return <h1>Error</h1>;
  }

  return (
    <AntLayout style={{ height: '100vh' }}>
      <Navbar options={navbarOptions} isFan={isFan} />
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
