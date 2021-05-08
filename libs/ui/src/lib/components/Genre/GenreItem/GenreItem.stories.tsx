import GenreItem from './GenreItem';

export default {
  title: 'GenreItem',
  component: GenreItem,
};

const Template = (args) => <GenreItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Rock',
  className: {
    width: '10%',
    borderRadius: '10px',
  },
};
