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
    };
  }

  componentDidMount() {
    const getName = localStorage.getItem('name');
    const getPicture = localStorage.getItem('picture');
    const getScore = localStorage.getItem('score');
    this.setState({
      name: getName,
      picture: getPicture,
      score: getScore,
    });
  }

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const tres = 3;
    const { name, picture, score } = this.state;
    // const { score } = this.props;
    // if (answers < tres) {
    //  return (
    //    <div>

    //      <h2 data-testid="feedback-text">Could be better...</h2>
    //      <p data-testid="feedback-total-question">
    //        Você acertou
    //        <span>{` ${answers}`}</span>
    //        {answers.length === 1 ? ' pergunta(s)!' : ' pergunta(s)!'}
    //      </p>
    //      <p data-testid="feedback-total-score">
    //        Um total de
    //        <span>{` ${score}`}</span>
    //        {score.length === 1 ? ' score!' : ' scores!'}
    //      </p>

    //    </div>
    //  );
    // }

    // if (answers >= tres) {
    //  return (
    //    <div>
    //      <h2 data-testid="feedback-text">Well Done!</h2>
    //      <p data-testid="feedback-total-question">
    //        Você acertou
    //        <span>{` ${answers}`}</span>
    //        {answers.length === 1 ? ' answer!' : ' answers!'}
    //      </p>

    //      <p data-testid="feedback-total-score">
    //        Um total de
    //        <span>{` ${score}`}</span>
    //        {score.length > 1 ? ' score!' : ' scores!'}
    //      </p>
    //    </div>
    //  );
    // }
    return (

      <>
        <header>
          <h1 data-testid="feedback-text">feedback</h1>
          { score >= tres ? <h1 data-testid="feedback-text">Well Done!</h1>
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
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    score: PropTypes.number,
    // answers: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
