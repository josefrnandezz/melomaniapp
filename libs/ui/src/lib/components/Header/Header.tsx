import { AccountMenu } from '@melomaniapp/ui';
import { Col, Input, Layout, Row } from 'antd';
import React from 'react';

export const Header = () => (
  <Layout.Header>
    <Row>
      <Col xs={16} sm={16} md={8}>
        <Input style={{ borderRadius: '500px' }} />
      </Col>
      <Col xs={{ offset: 4, span: 4 }} md={{ offset: 8, span: 8 }}>
        <div style={{ float: 'right' }}>
          <AccountMenu />
        </div>
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;
