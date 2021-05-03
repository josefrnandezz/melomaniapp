import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import { Navbar, NavbarProps } from './Navbar';

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const EstablishmentNavbar = Template.bind({});
EstablishmentNavbar.args = {
  options: [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeOutlined />,
      href: '/home',
    },
    {
      key: 'events',
      title: 'My events',
      icon: <CarryOutOutlined />,
      href: '/events',
    },
  ],
  isFan: false,
};

export const FanNavbar = Template.bind({});
FanNavbar.args = {
  options: [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeOutlined />,
      href: '/home',
    },
    {
      key: 'discover',
      title: 'Discover',
      icon: <SearchOutlined />,
      href: '/discover',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      icon: <BellOutlined />,
      href: '/notifications',
    },
    {
      key: 'events',
      title: 'My events',
      icon: <CarryOutOutlined />,
      href: '/events',
    },
  ],
  isFan: true,
};
