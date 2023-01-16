import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, waitFor, fireEvent, createEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PasswordReset from '../../pages/PasswordReset';
import callApiFetch from '../../helpers/callApiFetch';
import querystring from 'querystring';
import i18next from '../../i18n';

let container, user;
const testEmail = 'test_password_reset@test.com';

beforeAll(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);

  const password = 'testtest';
  let data = await callApiFetch('test/create_user', {email: testEmail, password: 'testtest'});

  user = data.user;
  user.password_raw = password;
});

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});


it('works', async () => {
  i18next.changeLanguage('cimode');
  act(() => {
    ReactDOM.createRoot(container).render(<PasswordReset t={i18next.t} />);
  });

  const input = await waitFor(() => screen.getByTestId('email'))
  
  fireEvent.change(input.querySelector('input'), {target: {value: testEmail}})

  let nextButton = screen.getByText('signup.next')

  fireEvent.click(nextButton);

  let confirmation_input = await waitFor(() => screen.getByTestId('confirmation-code'), {timeout: 3000})

  const { code } = await callApiFetch('test/confirmation_code', {email: testEmail});

  fireEvent.change(confirmation_input.querySelector('input'), {target: {value: parseInt(code) + 1}});

  nextButton = screen.getByText('signup.next')

  fireEvent.click(nextButton);

  confirmation_input = await waitFor(() => screen.getByTestId('confirmation-code'))
  
  screen.findByText('Wrong confirmation code');

  fireEvent.change(confirmation_input.querySelector('input'), {target: {value: parseInt(code)}});

  await waitFor(() => screen.getByText('signup.next'))
  nextButton = screen.getByText('signup.next')

  fireEvent.click(nextButton);

  await waitFor(() => screen.getByTestId('password1'), {timeout: 3000})
  const newPassword = 'a'.repeat(6);
  fireEvent.change(screen.getByTestId('password1').querySelector('input'), {target: {value: newPassword}});
  fireEvent.change(screen.getByTestId('password2').querySelector('input'), {target: {value: newPassword}});

  nextButton = screen.getByText('signup.next')
  fireEvent.click(nextButton);

  await waitFor(() => screen.getByText('signup.signin'), {timeout: 3000})

  const signIn = await callApiFetch('user/sign-in', {email: testEmail, password: newPassword, remember: false});

  expect(signIn.success).toBe(true);
  expect(signIn.token).not.toBe('');
});
