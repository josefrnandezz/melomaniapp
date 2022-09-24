import { Layout as AntLayout, Typography } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

import Header from './Header';
import { SignIn } from '@melomaniapp/ui';
import { useSession } from 'next-auth/client';

const { Content, Footer } = AntLayout;

export type LayoutProps = {
  session?: Session;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const [session] = useSession();

  return (
    <AntLayout>
      <Header session={session} />
      <Content
        style={{
          padding: '0 50px',
          marginTop: '60px',
          backgroundColor: '#dee2e6',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            padding: '24px',
            height: '100%',
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
