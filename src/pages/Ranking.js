import PropTypes from 'prop-types';
import React, { Component } from 'react';
import rankingImg from '../images/ranking.png';
import star from '../images/star-icon.png';
import '../styles/ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
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
    const { ranking } = this.state;
    return (
      <>
        <img src={ rankingImg } alt="ranking" className="ranking" />
        { ranking.map((player, index) => (
          <div key={ index } className="div-indiv-ranking">
            <img src={ player.picture } alt="Gravatar" className="img-gravatar-ranking" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <div className="div-points-ranking">
              <img src={ star } alt="star-icon" className="star-icon" />
              <span data-testid={ `player-score-${index}` }>{ player.score }</span>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn-go-home"
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
