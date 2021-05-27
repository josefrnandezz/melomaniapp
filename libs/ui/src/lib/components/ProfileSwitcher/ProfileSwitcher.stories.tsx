import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ProfileSwitcher, ProfileSwitcherProps } from './ProfileSwitcher';

export default {
  title: 'ProfileSwitcher',
  component: ProfileSwitcher,
} as Meta;

const Template: Story<ProfileSwitcherProps> = (args) => (
  <ProfileSwitcher {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profiles: [
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
  ],
};
