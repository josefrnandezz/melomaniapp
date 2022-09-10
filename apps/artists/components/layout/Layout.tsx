import { Layout as AntLayout, Typography } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

import Header from './Header';
import { SignIn } from '@melomaniapp/ui';

const { Content, Footer } = AntLayout;

export type LayoutProps = {
  session?: Session;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  children,
}) => {
  return (
    <AntLayout>
      <Header session={session} />
      <Content
        style={{
          padding: '0 50px',
          marginTop: '60px',
          backgroundColor: '#dee2e6',
          height: '100%',
        }}
      >
        <div
          style={{
            minHeight: '280px',
            padding: '24px',
          }}
        >
          {session ? children : <SignIn />}
        </div>
      </Content>

      <div
        style={{
          maxHeight: '60px',
        }}
      >
        <Footer
          style={{
            textAlign: 'center',
            zIndex: 1,
            background: 'white',
          }}
        >
          <Typography.Title level={5}>
            {`Melomaniapp ©${new Date().getFullYear()}`}
          </Typography.Title>
        </Footer>
      </div>
    </AntLayout>
  );
};

export default AntLayout;
