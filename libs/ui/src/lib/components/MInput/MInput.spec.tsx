import { render } from '@testing-library/react';
import React from 'react';

import MInput from './MInput';

describe('MInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MInput />);
    expect(baseElement).toBeTruthy();
  });
});
