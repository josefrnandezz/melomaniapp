import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ProfileSwitcher } from '@melomaniapp/ui';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

export interface NavbarProps {
  options: Array<any>;
}

export const Navbar = ({ options }: NavbarProps) => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
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
        <Menu.Divider />
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          bottom: '30px',
        }}
      >
        <ProfileSwitcher artistProfiles={[]} establishmentProfiles={[]} />
      </div>
    </Sider>
  );
};

export default Navbar;
