import {
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
  },
  {
    key: 'search',
    title: 'Search',
    icon: <SearchOutlined />,
  },
  {
    key: 'events',
    title: 'My events',
    icon: <CarryOutOutlined />,
  },
];

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navbar options={mockedOptions} />);
    expect(baseElement).toBeTruthy();
  });
});
