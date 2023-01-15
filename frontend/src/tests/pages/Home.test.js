import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import i18next from '../../i18n';

test('renders home page', () => {
  render(<Home t={i18next.t} />);
  const linkElement = screen.getByText(/Book my training now/i);
  expect(linkElement).toBeInTheDocument();
});
