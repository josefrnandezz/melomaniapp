import { SearchOutlined } from '@ant-design/icons';
import { AccountMenu } from '@melomaniapp/ui';
import { Col, Input, Layout, Row } from 'antd';
import React from 'react';

export const Header = () => {
  return (
    <Layout.Header>
      <Row>
        <Col xs={16} sm={16} md={8}>
          <Input
            placeholder="Genres, Events, Establishments..."
            style={{ borderRadius: '500px' }}
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col xs={{ offset: 4, span: 4 }} md={{ offset: 8, span: 8 }}>
          <div style={{ float: 'right' }}>
            <AccountMenu />
          </div>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
