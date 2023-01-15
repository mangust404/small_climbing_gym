import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, waitFor, fireEvent, createEvent, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignIn from '../../pages/SignIn';
import callApiFetch from '../../helpers/callApiFetch';
import querystring from 'querystring';
import i18next from '../../i18n';

let container, user;

beforeAll(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);

  const password = 'testtest';
  let data = await callApiFetch('test/create_user', {email: 'test_sign_in@test.com', password: 'testtest'});

  user = data.user;
  user.password_raw = password;
});

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

let mockState = {token: '', name: ''};

function setA14n(s) {
  mockState = s();
}


it('works', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(<SignIn t={i18next.t} setA14n={setA14n} />);
  });

  const email = await waitFor(() => screen.getByTestId('email'))
  const password = await waitFor(() => screen.getByTestId('password'))
  
  fireEvent.change(email.querySelector('input'), {target: {value: user.email}})
  fireEvent.change(password.querySelector('input'), {target: {value: user.password_raw}})

  let signInButton = screen.getByTestId('sign-in')

  fireEvent.click(signInButton);

  await expect(new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockState.token);
    }, 3000);
  })).resolves.not.toBe('');

});
