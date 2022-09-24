import { Layout as AntLayout, Typography } from 'antd';
import React from 'react';

import Header from './Header';
import { SignIn } from '@melomaniapp/ui';
import { useSession } from 'next-auth/client';

const { Content, Footer } = AntLayout;

export const Layout: React.FunctionComponent = ({ children }) => {
  const [session] = useSession();

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
            minHeight: '100vh',
            height: '100%',
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
            margin: 'auto',
            textAlign: 'center',
            zIndex: 1,
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
