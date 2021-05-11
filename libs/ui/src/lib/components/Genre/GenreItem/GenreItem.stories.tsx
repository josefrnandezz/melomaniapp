import GenreItem from './GenreItem';

export default {
  title: 'GenreItem',
  component: GenreItem,
};

const Template = (args) => <GenreItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  genre: { id: 'rock', name: 'Rock' },
};
