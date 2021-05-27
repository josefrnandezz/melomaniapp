import { render } from '@testing-library/react';

import GenreList from './GenreList';

const mockedGenres = [
  { id: 'rock', name: 'Rock' },
  { id: 'techno', name: 'Techno' },
  { id: 'pop', name: 'Pop' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'latin', name: 'Latin' },
  { id: 'country', name: 'Country' },
  { id: 'classical', name: 'Classical' },
];

describe('GenreList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenreList genres={mockedGenres} />);
    expect(baseElement).toBeTruthy();
  });
});
