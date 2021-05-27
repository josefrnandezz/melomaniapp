import { render } from '@testing-library/react';
import React from 'react';

import AccountMenu from './AccountMenu';

describe('AccountMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountMenu />);
    expect(baseElement).toBeTruthy();
  });
});
