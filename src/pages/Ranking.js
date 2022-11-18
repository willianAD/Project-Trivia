import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
      scoreOrder: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // const score = ranking.map((player) => player.score);
    const scoreOrder = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: scoreOrder,
    });
  }

  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking, scoreOrder } = this.state;
    console.log(ranking);
    console.log(scoreOrder);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt="Gravatar" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleButton() }
        >
          Voltar ao Início
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
