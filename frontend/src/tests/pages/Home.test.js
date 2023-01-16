import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import i18next from '../../i18n';

test('renders home page', () => {
  i18next.changeLanguage('cimode');

  render(<Home t={i18next.t} />);
  const linkElement = screen.getByText('home.book_now_link');
  expect(linkElement).toBeInTheDocument();
});
