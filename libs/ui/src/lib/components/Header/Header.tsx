import { BellOutlined, LoginOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Menu, Modal, Row, Typography } from 'antd';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/client';
import { useState } from 'react';

import AccountMenu from '../AccountMenu/AccountMenu';

export type HeaderProps = {
  session?: Session;
};

const SignIn = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        data-cy="signInButton"
        icon={<LoginOutlined />}
        onClick={() => setVisible(true)}
      >
        Sign in
      </Button>
      <Modal
        title="Choose your sign in method"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Button
          onClick={() =>
            signIn('google', { callbackUrl: 'http://localhost:4200' })
          }
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
};

const Logo = () => (
  <Typography.Text style={{ color: 'white' }}>
    Melomaniapp for fans
  </Typography.Text>
);

export const Header = ({ session }: HeaderProps) => {
  return (
    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="end">
        <Col span={14}>
          <Logo />
        </Col>
        <Col span={6} offset={2}>
          <Menu mode="horizontal" theme="dark">
            <Menu.Item key="discover" icon={<SearchOutlined />}>
              Discover
            </Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>
              Notifications
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={2}>
          {!session ? <SignIn /> : <AccountMenu session={session} />}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
