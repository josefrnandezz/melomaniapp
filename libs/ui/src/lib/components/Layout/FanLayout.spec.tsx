import { render } from '@testing-library/react';

import FanLayout from './FanLayout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FanLayout>This is a test</FanLayout>);
    expect(baseElement).toBeTruthy();
  });
});