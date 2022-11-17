import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { fetchGravatar } from '../redux/action';

describe('', () => {
  it('', () => {
    const getGravatar = {
      fetchGravatar,
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(getGravatar),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    
          const url = '/feedback';
        act(() => {
          history.push(url);
        });
    const imagem = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const placar = screen.getByTestId('header-score');
    userEvent.type(imagem, { name: /gravatar/i });
    userEvent.type(name, { name: /name/i });
    userEvent.type(placar, { name: /score/i });
    // userEvent.type(name, ('lilibertola'));
    // userEvent.type(image, { h1: /gavatar/i });
//h1 que faz se consta no HEADER? esqueci!
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    // const buttonPlayAgain = screen.getByRole('button');
    // expect(buttonPlayAgain).toBeInTheDocument();

    const msg1 = screen.getByTextId('feedback-text');
    userEvent.click(msg1);
    // ela deve ser clicada 3x para exibia a msg? ou só conter o data text id?
    const scoreBtn = screen.getByRole('button', { name: /score/i });
    // const answer = screen.getByRole('answer');
    const result = screen.getByRole('result');
    userEvent.click(scoreBtn);
    expect(result).toBeVisible();
  });
});
