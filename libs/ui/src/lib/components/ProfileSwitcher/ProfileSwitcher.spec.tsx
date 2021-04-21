import { render } from '@testing-library/react';
import React from 'react';

import { ProfileSwitcher } from './ProfileSwitcher';

const artistProfiles = [
  {
    username: 'peggygou',
    displayName: 'Peggy Gou',
  },
  {
    username: 'santandave',
    displayName: 'Dave',
  },
];

const establishmentProfiles = [
  {
    username: 'komoost',
    displayName: 'OOST',
  },
];

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ProfileSwitcher
        artistProfiles={artistProfiles}
        establishmentProfiles={establishmentProfiles}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
