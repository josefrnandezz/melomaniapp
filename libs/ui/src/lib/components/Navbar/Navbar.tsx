import { ProfileSwitcher } from '@melomaniapp/ui';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';

const { Sider } = Layout;

export interface NavbarProps {
  options: Array<any>;
  isFan: boolean;
}

export const Navbar = ({ options, isFan }: NavbarProps) => {
  return (
    <Sider
      theme="light"
      breakpoint="md"
      style={{
        borderRight: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="logo">
        <Link href="/">
          <h2>Melomaniapp</h2>
        </Link>
      </div>
      <Menu theme="light" mode="inline" triggerSubMenuAction="click">
        {options.map((option) => (
          <Menu.Item key={option.key} icon={option.icon}>
            <Link href={option.href}>{option.title}</Link>
          </Menu.Item>
        ))}
        {!isFan && (
          <div
            style={{
              overflow: 'visible',
              position: 'absolute',
              marginLeft: '16px',
              bottom: '30px',
            }}
          >
            <ProfileSwitcher
              profiles={[{ username: 'oost', displayName: 'OOST' }]}
            />
          </div>
        )}
      </Menu>
    </Sider>
  );
};

export default Navbar;