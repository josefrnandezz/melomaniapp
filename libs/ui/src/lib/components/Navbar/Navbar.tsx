import '../../assets/navbar.css';

import { MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Header } = Layout;
const { SubMenu } = Menu;

export interface NavbarProps {
  options: Array<any>;
}

export const Navbar = ({ options }: NavbarProps) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={options[0].key}
        triggerSubMenuAction="click"
        onOpenChange={() => setIsOpened(!isOpened)}
      >
        {options.map((option) => (
          <Menu.Item key={option.key} icon={option.icon}>
            {option.title}
          </Menu.Item>
        ))}
        <SubMenu
          key="burgerMenu"
          icon={<MenuOutlined />}
          className="burgerMenu"
        >
          <Menu.ItemGroup title="Profile">
            <Menu.Item key="artist">Artist</Menu.Item>
            <Menu.Item key="establishment">Establishment</Menu.Item>
            <Menu.Item key="fan">Fan</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default Navbar;
