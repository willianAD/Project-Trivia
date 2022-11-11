import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { fetchAPItoken } from '../redux/action';

describe('Testing if the login page works correctly', () => {
  test('Test if when starting application the enter button starts disabled', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const getToken = {
      fetchAPItoken,
    };

    // const url = '/gamepage';
    // act(() => {
    //   history.push(url);
    // });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(getToken),
    });

    const btn = screen.getByRole('button', { name: /Play/i });
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'trybe@gmail.com');
    userEvent.type(name, 'Fabio Henrique Luiz');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
  });
});
