import GenreList from './GenreList';

export default {
  title: 'GenreList',
  component: GenreList,
};

const Template = (args) => <GenreList {...args} />;

export const Default = Template.bind({});
Default.args = {
  genres: [
    { _id: 'rock', name: 'Rock' },
    { _id: 'techno', name: 'Techno' },
    { _id: 'pop', name: 'Pop' },
    { _id: 'jazz', name: 'Jazz' },
    { _id: 'latin', name: 'Latin' },
    { _id: 'country', name: 'Country' },
    { _id: 'classical', name: 'Classical' },
  ],
};
