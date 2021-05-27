import {
  BellOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { render } from '@testing-library/react';
import React from 'react';

import Navbar from './Navbar';

const mockedOptions = [
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
];

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Navbar options={mockedOptions} isFan={true} />
    );
    expect(baseElement).toBeTruthy();
  });
});
