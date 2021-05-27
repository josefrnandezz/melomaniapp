import { render } from '@testing-library/react';
import React from 'react';

import GenreItem from './GenreItem';

describe('GenreItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GenreItem genre={{ id: 'genre', name: 'Genre' }} />
    );
    expect(baseElement).toBeTruthy();
  });
});
