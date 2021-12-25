import { Layout } from 'antd';
import { Session } from 'next-auth';
import React from 'react';

import Header from '../Header/Header';

const { Content } = Layout;

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
      <Content style={{ height: '100%', margin: '24px', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default FanLayout;
