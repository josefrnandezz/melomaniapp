import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Header
        session={{
          expires: '',
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
