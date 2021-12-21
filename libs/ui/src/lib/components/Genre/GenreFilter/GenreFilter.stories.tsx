import GenreFilter from './GenreFilter';

export default {
  title: 'GenreFilter',
  component: GenreFilter,
};

const Template = (args) => <GenreFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  genres: [
    { _id: 'rock', name: 'Rock' },
    { _id: 'techno', name: 'Techno' },
    { _id: 'rap', name: 'Rap' },
    { _id: 'pop', name: 'Pop' },
  ],
  className: {
    width: '20%',
  },
  onChangeHandler: (values: string[]) => {
    console.log(values);
  },
};
