import {
  EllipsisOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import React, { useEffect } from 'react';

const mainUser = {
  username: 'josefrnandezz',
  displayName: 'Jose Fernandez',
};

export interface ProfileSwitcherProps {
  artistProfiles: Array<any>;
  establishmentProfiles: Array<any>;
}

export const ProfileSwitcher = ({
  artistProfiles,
  establishmentProfiles,
}: ProfileSwitcherProps) => {
  const [activeProfile, setActiveProfile] = React.useState(
    mainUser.displayName
  );

  const handleProfilesListClick = (event) => {
    [...artistProfiles, ...establishmentProfiles].map((profile) => {
      if (profile.username === event.key) {
        setActiveProfile(profile.displayName);
      }
    });
  };

  const profiles = (
    <Menu>
      <Menu onClick={handleProfilesListClick}>
        <Menu.Item
          key={mainUser.username}
          icon={
            <Avatar size="small" style={{ marginRight: '10px' }}>
              {mainUser.displayName[0].toUpperCase()}
            </Avatar>
          }
        >
          {mainUser.displayName}
        </Menu.Item>
        {[...artistProfiles, ...establishmentProfiles].map((profile) => (
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
      overlay={profiles}
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
