import { BellOutlined, SearchOutlined, HomeOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row, Space, Typography } from 'antd';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import { AccountMenu } from '@melomaniapp/ui';
import { useRouter } from 'next/router';

export type HeaderProps = {
  session?: Session;
};

const Logo = () => {
  const router = useRouter();

  return (
    <Row style={{ display: 'flex', alignContent: 'center' }}>
      <Space size="small">
        <Col flex="100px" style={{ marginTop: '10px' }}>
          <Image
            src="/favicon/logo.png"
            alt=""
            width="40px"
            height="40px"
            onClick={() => router.push('/')}
          />
        </Col>
        <Col flex="auto">
          <Typography.Title level={4}>Melomaniapp for Fans</Typography.Title>
        </Col>
      </Space>
    </Row>
  );
};

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
      <Row justify="end">
        {!session ? (
          <Col span={24}>
            <Logo />
          </Col>
        ) : (
          <>
            <Col span={11}>
              <Logo />
            </Col>
            <Col span={10} offset={1}>
              <Menu selectable={false} mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link href="/">Inicio</Link>
                </Menu.Item>
                <Menu.Item key="genres" icon={<SearchOutlined />}>
                  <Link href="/genres">Géneros</Link>
                </Menu.Item>
                <Menu.Item key="follows" icon={<BellOutlined />}>
                  <Link href="/follows">Subscripciones</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={2}>
              <AccountMenu session={session} />
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
