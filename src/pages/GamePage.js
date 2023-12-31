import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { fetchAPIquestion, fetchGravatar, changePoints } from '../redux/action';
import star from '../images/star-icon.png';
import '../styles/game.css';
import '../styles/loading.css';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayAPI: [],
      loading: false,
      index: 0,
      answers: [],
      timer: 30,
      buttonDisabled: false,
      greenButton: { border: '' },
      redButton: { border: '' },
      buttonClickNext: false,
      score: 0,
      questionLevel: '',
      name: '',
      email: '',
      assertions: 0,
    };
  }

  componentDidMount() {
    this.reciveAPI();
    this.handleTimer();
    const playerName = localStorage.getItem('name');
    const playerEmail = localStorage.getItem('email');
    this.setState({ name: playerName, email: playerEmail });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 1) {
      this.setState({ buttonDisabled: true, buttonClickNext: true,
      }, () => clearInterval(this.id));
    }
  }

  getGravatar = () => {
    const { email, dispatch } = this.props;
    const { score } = this.state;
    const emailMd5 = md5(email).toString();
    localStorage.setItem('picture', (`https://www.gravatar.com/avatar/${emailMd5}`));
    localStorage.setItem('score', (+score));
    dispatch(fetchGravatar(emailMd5));
    return emailMd5;
  };

  reciveAPI = async () => {
    const { history } = this.props;
    const codeNumber = 3;
    const token = localStorage.getItem('token');
    const questionAPI = await fetchAPIquestion(token);
    if (questionAPI.response_code === codeNumber) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ arrayAPI: questionAPI.results, loading: true,
    }, () => this.randonQuestions());
  };

  randonQuestions = () => {
    const { arrayAPI, index } = this.state;
    const randomNumber = 0.5;
    if (arrayAPI.length > 0) {
      const answer = [arrayAPI[index].correct_answer,
        ...arrayAPI[index].incorrect_answers];
      const randomAnswer = answer.sort(() => Math.random() - randomNumber);
      this.setState({ answers: randomAnswer, questionLevel: arrayAPI[index].difficulty });
    }
  };

  handleTimer = () => {
    const interval = 1000;
    this.id = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, interval);
  };

  buttonClick = ({ target }) => {
    const { dispatch } = this.props;
    const { timer, questionLevel } = this.state;
    const points = 10;
    const hard = 3;
    const testId = target.getAttribute('data-testid');
    const correctAnswer = 'correct-answer';
    const greenBorder = '5px solid rgb(6, 240, 15)';
    const redBorder = '5px solid red';
    if (testId === correctAnswer && questionLevel === 'easy') {
      this.setState((prevState) => ({
        greenButton: { border: greenBorder },
        redButton: { border: redBorder },
        buttonClickNext: true,
        score: prevState.score + points + timer * 1,
        assertions: prevState.assertions + 1,
      }), () => {
        const { name, score, email, assertions } = this.state;
        dispatch(changePoints({ score, name, email, assertions }));
      });
    } else if (testId === correctAnswer && questionLevel === 'medium') {
      this.setState((prevState) => ({
        greenButton: { border: greenBorder },
        redButton: { border: redBorder },
        buttonClickNext: true,
        score: prevState.score + points + timer * 2,
        assertions: prevState.assertions + 1,
      }), () => {
        const { name, score, email, assertions } = this.state;
        dispatch(changePoints({ score, name, email, assertions }));
      });
    } else if (testId === correctAnswer && questionLevel === 'hard') {
      this.setState((prevState) => ({
        greenButton: { border: greenBorder },
        redButton: { border: redBorder },
        buttonClickNext: true,
        score: prevState.score + points + timer * hard,
        assertions: prevState.assertions + 1,
      }), () => {
        const { name, score, email, assertions } = this.state;
        dispatch(changePoints({ score, name, email, assertions }));
      });
    } else {
      this.setState(() => ({
        greenButton: { border: '5px solid rgb(6, 240, 15)' },
        redButton: { border: '5px solid red' },
        buttonClickNext: true,
      })); const { name, score, email, assertions } = this.state;
      dispatch(changePoints({ score, name, email, assertions }));
    }
    clearInterval(this.id);
  };

  buttonNext = () => {
    const { history } = this.props;
    const { index, arrayAPI, assertions } = this.state;
    const feedbackNumber = 4;
    if (index < arrayAPI.length - 1) {
      this.setState({
        index: index + 1,
        greenButton: { border: '' },
        redButton: { border: '' },
        buttonClickNext: false,
        timer: 30,
        buttonDisabled: false,
        questionLevel: arrayAPI[index].difficulty,
      }, () => this.randonQuestions(), this.handleTimer());
    }
    if (index === feedbackNumber) {
      localStorage.setItem('assertions', (assertions));
      history.push('/feedback');
    }
  };

  render() {
    const { name } = this.props;
    const { arrayAPI, loading, index, answers, buttonClickNext, redButton,
      greenButton, timer, buttonDisabled, score } = this.state;
    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${this.getGravatar()}` } alt="Imagem de perfil" className="img-gravatar" />
          <p className="header-player-name">{ name }</p>
          <div className="div-points-game">
            <img src={ star } alt="star-icon" className="star-icon" />
            <span className="header-score">{ score }</span>
          </div>
        </header>
        { !loading
          ? <div className="loading"><p>LOADING...</p></div>
          : (
            <section>
              <p className="question-category">{ arrayAPI[index].category }</p>
              <p className="question-text">{ arrayAPI[index].question }</p>
              <div className="answer-options">
                { answers.map((answer, i) => (
                  (answer !== arrayAPI[index].correct_answer)
                    ? (
                      <button
                        key={ i }
                        type="button"
                        style={ redButton }
                        onClick={ this.buttonClick }
                        className="button-answer"
                        data-testid={ `wrong-answer-${i}` }
                        disabled={ buttonDisabled }
                        nivel={ arrayAPI[index].difficulty }
                      >
                        { answer }
                      </button>
                    )
                    : (
                      <button
                        key="correct"
                        type="button"
                        style={ greenButton }
                        onClick={ this.buttonClick }
                        className="button-answer"
                        data-testid="correct-answer"
                        disabled={ buttonDisabled }
                        nivel={ arrayAPI[index].difficulty }
                      >
                        { answer }
                      </button>
                    )
                ))}
              </div>
              { buttonClickNext
                ? (
                  <button
                    type="button"
                    className="button-next"
                    onClick={ this.buttonNext }
                  >
                    NEXT
                  </button>
                )
                : null}
              <div className="div-timer">
                <h6>TEMPO</h6>
                <h1>{ timer }</h1>
              </div>
            </section>
          )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(GamePage);
