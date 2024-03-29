import { ApiOutlined, HomeOutlined } from '@ant-design/icons';
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
      <Link href="/">
        <Col flex="100px" style={{ marginTop: '10px' }}>
          <Image src="/favicon/logo.png" alt="" width="40px" height="40px" />
        </Col>
      </Link>
      <Col flex="auto">
        <Typography.Title level={4} style={{ color: '#cae9ff' }}>
          Melomaniapp for Artists
        </Typography.Title>
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
              <Menu selectable={false} mode="horizontal" theme="dark">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link href="/">Inicio</Link>
                </Menu.Item>
                <Menu.Item key="follows" icon={<ApiOutlined />}>
                  <Link href="/follows">Conexiones</Link>
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
