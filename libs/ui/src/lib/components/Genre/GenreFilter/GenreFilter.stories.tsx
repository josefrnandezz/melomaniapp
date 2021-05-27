import GenreFilter from './GenreFilter';

export default {
  title: 'GenreFilter',
  component: GenreFilter,
};

const Template = (args) => <GenreFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  genres: [
    { id: 'rock', name: 'Rock' },
    { id: 'techno', name: 'Techno' },
    { id: 'rap', name: 'Rap' },
    { id: 'pop', name: 'Pop' },
  ],
  className: {
    width: '20%',
  },
  onChangeHandler: (values: string[]) => {
    console.log(values);
  },
};
