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

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'search',
      title: 'Search',
      icon: <SearchOutlined />,
    },
    {
      key: 'notifications',
      title: 'Notifications',
      icon: <BellOutlined />,
    },
    {
      key: 'events',
      title: 'My events',
      icon: <CarryOutOutlined />,
    },
  ],
};

export const EstablishmentNavbar = Template.bind({});
EstablishmentNavbar.args = {
  options: [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'events',
      title: 'My events',
      icon: <CarryOutOutlined />,
    },
  ],
};

export const FanNavbar = Template.bind({});
FanNavbar.args = {
  options: [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'search',
      title: 'Search',
      icon: <SearchOutlined />,
    },
    {
      key: 'notifications',
      title: 'Notifications',
      icon: <BellOutlined />,
    },
  ],
};
