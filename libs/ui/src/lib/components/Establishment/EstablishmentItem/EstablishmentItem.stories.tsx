import * as faker from 'faker';

import { EstablishmentDTO } from '../../../../../../contracts/establishment/src';
import EstablishmentItem from './EstablishmentItem';

const mockedEstablishment: EstablishmentDTO = {
  _id: faker.datatype.uuid(),
  ownerId: faker.datatype.uuid(),
  name: faker.company.companyName(),
  alias: faker.internet.userName(),
  email: faker.internet.email(),
  description: faker.lorem.paragraphs(),
  address: { city: faker.address.cityName(), full: faker.address.streetName() },
  genreIds: [
    'A74E0974-6D8F-42DB-A181-A97EE323C94D',
    'A02CDE56-7E0F-488F-9561-470510B861FB',
  ],
};

export default {
  title: 'EstablishmentItem',
  component: EstablishmentItem,
};

const Template = (args) => <EstablishmentItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: mockedEstablishment,
  genres: [
    { _id: 'A74E0974-6D8F-42DB-A181-A97EE323C94D', name: 'rock' },
    { _id: 'A02CDE56-7E0F-488F-9561-470510B861FB', name: 'techno' },
    { _id: 'D17765A5-1988-4066-B875-BF9B73A7A5A3', name: 'dnb' },
  ],
};
