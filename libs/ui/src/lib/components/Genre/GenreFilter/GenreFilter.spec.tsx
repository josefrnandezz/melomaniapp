import { render } from '@testing-library/react';
import React from 'react';

import GenreFilter from './GenreFilter';

const mockedGenres = [
  { id: 'rock', name: 'Rock' },
  { id: 'techno', name: 'Techno' },
  { id: 'rap', name: 'Rap' },
  { id: 'pop', name: 'Pop' },
];

describe('GenreFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenreFilter genres={mockedGenres} />);
    expect(baseElement).toBeTruthy();
  });
});
