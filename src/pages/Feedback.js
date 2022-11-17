import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      picture: '',
      score: 0,
      assertions: 0,
      // loading: true,
    };
  }

  componentDidMount() {
    const getName = localStorage.getItem('name');
    const getPicture = localStorage.getItem('picture');
    const getScore = localStorage.getItem('score');
    const getAssertions = localStorage.getItem('assertions');
    this.setState({
      name: getName,
      picture: getPicture,
      score: getScore,
      assertions: +getAssertions,
    });
    // if (typeof assertions !== 'NaN') {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const tres = 3;
    // const { assertions } = this.props;
    const { name, picture, score, assertions } = this.state;
    console.log(typeof assertions);
    return (
      <>
        <header>
          { assertions >= tres ? <h1 data-testid="feedback-text">Well Done!</h1>
            : <h1 data-testid="feedback-text">Could be better...</h1> }
          <span>
            <h1 data-testid="feedback-text">Could be better...</h1>
            { score > 1 ? score < tres : 'Could be better...' }
          </span>
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
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
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
  // assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
