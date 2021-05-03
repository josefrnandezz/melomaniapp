import { AccountMenu } from '@melomaniapp/ui';
import { Col, Input, Layout, Row, Divider } from 'antd';
import React from 'react';

export const Header = () => (
  <Layout.Header>
    <Row>
      <Col xs={0} sm={8} md={8}>
        <h2 style={{ color: 'rgb(255, 255, 255, 0.65)' }}>Melomaniapp</h2>
      </Col>
      <Col xs={16} sm={16} md={8}>
        <Input style={{ borderRadius: '500px' }} />
      </Col>
      <Col span={8}>
        <div style={{ float: 'right' }}>
          <AccountMenu />
        </div>
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;
