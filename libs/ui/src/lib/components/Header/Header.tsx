import { BellOutlined, LoginOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Menu, Row, Typography } from 'antd';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';

import AccountMenu from '../AccountMenu/AccountMenu';

export type HeaderProps = {
  session?: Session;
};

const SignInButton = () => (
  <Button
    data-cy="signInButton"
    icon={<LoginOutlined />}
    onClick={() => signIn()}
  >
    Sign in
  </Button>
);

const Logo = () => (
  <Typography.Text style={{ color: 'white' }}>Melomaniapp</Typography.Text>
);

export const Header = ({ session }: HeaderProps) => {
  return (
    <Layout.Header>
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
          {!session ? <SignInButton /> : <AccountMenu session={session} />}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
