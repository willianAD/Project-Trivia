import { screen, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';


describe('Testing if the Ranking page works correctly', () => {
  test('Testing if the Ranking page works correctly', () => { 

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/ranking');
    });
    const btn = screen.getByTestId('btn-go-home');
    const playerName = screen.getByTestId('player-name-${ index }');
    const score = screen.getByTestId('player-score-$ { index }');

    expect(btn).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  })
});