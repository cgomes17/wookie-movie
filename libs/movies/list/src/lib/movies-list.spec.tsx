import { render } from '@testing-library/react';

import MoviesList from './movies-list';

describe('MoviesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MoviesList />);
    expect(baseElement).toBeTruthy();
  });
});
