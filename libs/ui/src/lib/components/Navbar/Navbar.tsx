import { Layout, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';

const { Sider } = Layout;

export interface NavbarProps {
  options: Array<any>;
}

export const Navbar = ({ options }: NavbarProps) => {
  return (
    <Sider
      breakpoint="md"
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
      }}
    >
      <div className="logo" />
      <Menu
        style={{ position: 'absolute' }}
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
      >
        {options.map((option) => (
          <Menu.Item key={option.key} icon={option.icon}>
            {option.title}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Navbar;
