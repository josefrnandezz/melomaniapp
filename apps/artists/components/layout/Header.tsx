import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row, Space, Typography } from 'antd';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import { AccountMenu } from '@melomaniapp/ui';

export type HeaderProps = {
  session?: Session;
};

const Logo = () => (
  <Row style={{ display: 'flex', alignContent: 'center' }}>
    <Space size="small">
      <Col flex="100px" style={{ marginTop: '10px' }}>
        <Image src="/favicon/logo.png" alt="" width="40px" height="40px" />
      </Col>
      <Col flex="auto">
        <Typography.Title level={4}>Melomaniapp Artists</Typography.Title>
      </Col>
    </Space>
  </Row>
);

export const Header = ({ session }: HeaderProps) => {
  return (
    <Layout.Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: 'white',
      }}
    >
      <Row justify="center">
        {!session ? (
          <Col span={24}>
            <Logo />
          </Col>
        ) : (
          <>
            <Col span={14}>
              <Logo />
            </Col>
            <Col span={6} offset={2}>
              <Menu mode="horizontal">
                <Menu.Item key="genres" icon={<SearchOutlined />}>
                  <Link href="/genres">Géneros</Link>
                </Menu.Item>
                <Menu.Item key="follows" icon={<BellOutlined />}>
                  <Link href="/follows">Subscripciones</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col>
              <AccountMenu session={session} />
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
