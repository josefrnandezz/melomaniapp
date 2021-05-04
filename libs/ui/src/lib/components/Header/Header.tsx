import { SearchOutlined } from '@ant-design/icons';
import { AccountMenu, MInput } from '@melomaniapp/ui';
import { Col, Layout, Row } from 'antd';
import React, { useRef } from 'react';

export const Header = () => {
  return (
    <Layout.Header>
      <Row>
        <Col xs={16} sm={16} md={8}>
          <MInput
            placeholder="Genres, Events, Establishments..."
            className={{ borderRadius: '500px' }}
            onPressEnterHandler={(value) => {
              console.log(value);
            }}
            icon={<SearchOutlined />}
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
