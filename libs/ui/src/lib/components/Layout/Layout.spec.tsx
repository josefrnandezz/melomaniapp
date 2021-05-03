import { render } from '@testing-library/react';
import React from 'react';

import Layout from './Layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Layout session={{}} isFan={false}>
        This is a test
      </Layout>
    );
    expect(baseElement).toBeTruthy();
  });
});
