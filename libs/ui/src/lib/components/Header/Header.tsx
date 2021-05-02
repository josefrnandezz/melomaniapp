import { AccountMenu } from '@melomaniapp/ui';
import { Col, Layout, Row } from 'antd';
import React from 'react';

export const Header = () => (
  <Layout.Header>
    <Row>
      <Col style={{ backgroundColor: 'red' }} span={8}>
        Logo
      </Col>
      <Col push={16}>
        <AccountMenu></AccountMenu>
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;
