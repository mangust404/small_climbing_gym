import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, waitFor, fireEvent, createEvent, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/SignUp';
import callApiFetch from '../../helpers/callApiFetch';
import querystring from 'querystring';

let container;

beforeAll(() => {
  callApiFetch('test/cleanup');
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterAll(() => {
  callApiFetch('test/cleanup');
  document.body.removeChild(container);
  container = null;
});


it('works', async () => {

  act(() => {
    ReactDOM.createRoot(container).render(<SignUp />);
  });

  const input = await waitFor(() => screen.getByTestId('email'))
  
  fireEvent.change(input.querySelector('input'), {target: {value: 'test@test.com'}})

  let nextButton = screen.getByText('Next')

  fireEvent.click(nextButton);

  let confirmation_input = await waitFor(() => screen.getByTestId('confirmation-code'), {timeout: 3000})

  const { code } = await callApiFetch('test/confirmation_code', {email: 'test@test.com'});

  //console.log('code=', code);

  fireEvent.change(confirmation_input.querySelector('input'), {target: {value: parseInt(code) + 1}});

  nextButton = screen.getByText('Next')

  fireEvent.click(nextButton);

  confirmation_input = await waitFor(() => screen.getByTestId('confirmation-code'))
  
  screen.findByText('Wrong confirmation code');

  fireEvent.change(confirmation_input.querySelector('input'), {target: {value: parseInt(code)}});

  await waitFor(() => screen.getByText('Next'))
  nextButton = screen.getByText('Next')

  fireEvent.click(nextButton);

  await waitFor(() => screen.getByTestId('password1'), {timeout: 3000})
  fireEvent.change(screen.getByTestId('password1').querySelector('input'), {target: {value: 'a'.repeat(6)}});
  fireEvent.change(screen.getByTestId('password2').querySelector('input'), {target: {value: 'a'.repeat(6)}});
  fireEvent.change(screen.getByTestId('name').querySelector('input'), {target: {value: 'test user'}});

  nextButton = screen.getByText('Next')
  fireEvent.click(nextButton);
  
  await waitFor(() => screen.getByTestId('phone'))
  fireEvent.change(screen.getByTestId('phone').querySelector('input'), {target: {value: '+7 777 123 4567'}});

  nextButton = screen.getByText('Next')
  fireEvent.click(nextButton);

  await waitFor(() => screen.getByTestId('slider'))

  //screen.debug(null, 300000);

  nextButton = screen.getByTestId('submit-button')
  fireEvent.click(nextButton);


  /*const linkElement = screen.getByText(/Book my training now/i);
  expect(linkElement).toBeInTheDocument();*/
});
