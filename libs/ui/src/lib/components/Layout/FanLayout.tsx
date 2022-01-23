import { Layout, Typography } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

import Header from '../Header/Header';

const { Content, Footer } = Layout;

export type FanLayoutProps = {
  session?: Session;
};

export const FanLayout: React.FunctionComponent<FanLayoutProps> = ({
  session,
  children,
}) => {
  return (
    <Layout>
      <Header session={session} />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380, textAlign: 'center' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Typography.Paragraph>Melomaniapp ©2022</Typography.Paragraph>
      </Footer>
    </Layout>
  );
};

export default FanLayout;
