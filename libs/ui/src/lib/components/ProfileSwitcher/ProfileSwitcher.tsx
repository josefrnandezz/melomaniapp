import {
  EllipsisOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import React, { useEffect } from 'react';

export interface ProfileSwitcherProps {
  profiles: Array<any>;
}

export const ProfileSwitcher = ({ profiles }: ProfileSwitcherProps) => {
  const [activeProfile, setActiveProfile] = React.useState(
    profiles[0].displayName
  );

  const handleProfilesListClick = (event) => {
    profiles.map((profile) => {
      if (profile.username === event.key) {
        setActiveProfile(profile.displayName);
      }
    });
  };

  const profilesList = (
    <Menu>
      <Menu onClick={handleProfilesListClick}>
        {profiles.map((profile) => (
          <Menu.Item
            key={profile.username}
            icon={
              <Avatar size="small" style={{ marginRight: '10px' }}>
                {profile.displayName[0].toUpperCase()}
              </Avatar>
            }
          >
            {profile.displayName}
          </Menu.Item>
        ))}
        <Menu.Divider />
      </Menu>
      <Menu>
        <Menu.Item key="registerProfile" icon={<UserAddOutlined />}>
          Register a profile
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Log out
        </Menu.Item>
      </Menu>
    </Menu>
  );

  return (
    <Dropdown
      arrow
      overlay={profilesList}
      trigger={['click']}
      placement="topCenter"
    >
      <Button
        style={{ height: 'auto', width: 'auto', maxWidth: '170' }}
        shape="round"
        icon={<UserOutlined />}
      >
        {activeProfile}
        {<EllipsisOutlined />}
      </Button>
    </Dropdown>
  );
};

export default ProfileSwitcher;
