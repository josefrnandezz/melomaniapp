import React from 'react';

import GenreList from './GenreList';

export default {
  title: 'GenreList',
  component: GenreList,
};

const Template = (args) => <GenreList {...args} />;

export const Default = Template.bind({});
Default.args = {
  genres: [
    { id: 'rock', name: 'Rock' },
    { id: 'techno', name: 'Techno' },
    { id: 'pop', name: 'Pop' },
    { id: 'jazz', name: 'Jazz' },
    { id: 'latin', name: 'Latin' },
    { id: 'country', name: 'Country' },
    { id: 'classical', name: 'Classical' },
  ],
};
