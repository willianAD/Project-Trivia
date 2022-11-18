import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      picture: '',
      score: 0,
      assertions: 0,
      ranking: [],
    };
  }

  componentDidMount() {
    const name = localStorage.getItem('name');
    const picture = localStorage.getItem('picture');
    const score = +localStorage.getItem('score');
    const assertions = +localStorage.getItem('assertions');
    this.setState((prevState) => ({
      name,
      picture,
      score,
      assertions,
      ranking: [...prevState.ranking, { picture, name, score }],
    }));
  }

  buttonRanking = () => {
    const { history } = this.props;
    const { ranking } = this.state;
    if (localStorage.ranking === undefined) {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const storage = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...storage, ranking[0]]));
    }
    history.push('/ranking');
  };

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const tres = 3;
    const { name, picture, score, assertions } = this.state;
    return (
      <>
        <header>
          { assertions >= tres ? <h1 data-testid="feedback-text">Well Done!</h1>
            : <h1 data-testid="feedback-text">Could be better...</h1> }
          <img
            src={ picture }
            alt="Imagem de perfil"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <span>Score: </span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <section>
          <h2>PLACAR FINAL</h2>
          <div data-testid="feedback-total-score">{ score }</div>
          <div data-testid="feedback-total-question">{ assertions }</div>
        </section>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.buttonRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.buttonPlayAgain }
        >
          Play Again
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.gravatarIMG,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
