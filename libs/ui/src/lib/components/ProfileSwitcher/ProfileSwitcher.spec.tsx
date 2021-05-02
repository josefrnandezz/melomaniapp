import { render } from '@testing-library/react';
import React from 'react';

import { ProfileSwitcher } from './ProfileSwitcher';

const profiles = [
  {
    username: 'josefrnandezz',
    displayName: 'Jose Fernández',
  },
  {
    username: 'peggygou',
    displayName: 'Peggy Gou',
  },
  {
    username: 'santandave',
    displayName: 'Dave',
  },
  {
    username: 'komoost',
    displayName: 'OOST',
  },
];

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileSwitcher profiles={profiles} />);
    expect(baseElement).toBeTruthy();
  });
});
