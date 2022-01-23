import { render } from '@testing-library/react';

import GenreList from './GenreList';

const mockedGenres = [
  { _id: 'rock', name: 'Rock' },
  { _id: 'techno', name: 'Techno' },
  { _id: 'pop', name: 'Pop' },
  { _id: 'jazz', name: 'Jazz' },
  { _id: 'latin', name: 'Latin' },
  { _id: 'country', name: 'Country' },
  { _id: 'classical', name: 'Classical' },
];

describe('GenreList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenreList genres={mockedGenres} />);
    expect(baseElement).toBeTruthy();
  });
});
