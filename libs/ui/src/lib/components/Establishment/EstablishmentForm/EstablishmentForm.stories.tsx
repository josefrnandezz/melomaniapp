import { actions } from '@storybook/addon-actions';
import faker from 'faker';

import EstablishmentForm from './EstablishmentForm';

export default {
  title: 'EstablishmentForm',
  component: EstablishmentForm,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

const mockedEstablishment = {
  name: faker.company.companyName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  description: faker.lorem.paragraphs(),
  location: faker.address.cityName(),
  genres: [
    { id: 'rock', name: 'Rock' },
    { id: 'rap', name: 'Rap' },
  ],
};

const eventsFromNames = actions('onSubmit');

export const CreateEstablishment = (args) => <EstablishmentForm {...args} />;

export const EditEstablishment = (args) => <EstablishmentForm {...args} />;
EditEstablishment.args = {
  establishment: mockedEstablishment,
  ...eventsFromNames,
};
