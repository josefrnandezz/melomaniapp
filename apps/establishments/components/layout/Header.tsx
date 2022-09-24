import { HomeOutlined } from '@ant-design/icons';
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
        <Link href="/">
          <Image src="/favicon/logo.png" alt="" width="40px" height="40px" />
        </Link>
      </Col>
      <Col flex="auto">
        <Typography.Title level={4} style={{ color: '#cae9ff' }}>
          Melomaniapp for Establishments
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
      <Row justify="end">
        {!session ? (
          <Col span={24}>
            <Logo />
          </Col>
        ) : (
          <>
            <Col span={17}>
              <Logo />
            </Col>
            <Col span={3} offset={1}>
              <Menu selectable={false} mode="horizontal" theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                  <Link href="/">Inicio</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={3}>
              <AccountMenu session={session} />
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
