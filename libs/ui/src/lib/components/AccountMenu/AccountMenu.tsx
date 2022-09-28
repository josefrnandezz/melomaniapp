import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/client';

export type AccountMenuProps = {
  session?: Session;
};

export const AccountMenu = ({ session }: AccountMenuProps) => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link href="/profile">Mi perfil</Link>
      </Menu.Item>

      <Menu.Item
        data-cy="signOutButton"
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => signOut()}
      >
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
      <Avatar
        src={<img referrerPolicy="no-referrer" src={session.user?.image} />}
      />
    </Dropdown>
  );
};

export default AccountMenu;
