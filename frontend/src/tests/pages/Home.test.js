import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

test('renders home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Book my training now/i);
  expect(linkElement).toBeInTheDocument();
});
