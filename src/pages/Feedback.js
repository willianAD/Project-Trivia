import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/feedback.css';
import star from '../images/star-icon.png';

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
        <div className="div-header-feedback">
          <img src={ picture } alt="Imagem de perfil" className="img-gravatar-feedback" />
          <p className="header-player-name">{ name }</p>
          { assertions >= tres ? <h3 className="good-feedback-text">Well Done!</h3>
            : <h3 className="bad-feedback-text">Could be better ...</h3> }
          <div className="div-points">
            <img src={ star } alt="star-icon" className="star-icon" />
            <span className="header-score">{ score }</span>
          </div>
        </div>
        <div>
          <h2>FINAL SCORE</h2>
          <div className="div-points">
            <img src={ star } alt="star-icon" className="star-icon" />
            {score}
          </div>
          <h4>{`Assertion: ${assertions}`}</h4>
        </div>
        <div>
          <button
            type="button"
            className="btn-play-again"
            onClick={ this.buttonPlayAgain }
          >
            Play Again
          </button>
          <button
            type="button"
            className="btn-ranking"
            onClick={ this.buttonRanking }
          >
            Ranking
          </button>
        </div>
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
