import { ProfileSwitcher } from '@melomaniapp/ui';
import { Layout, Menu, Row } from 'antd';
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
      breakpoint="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Menu theme="dark" mode="inline" triggerSubMenuAction="click">
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
              marginLeft: '20%',
              marginRight: '20%',
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
