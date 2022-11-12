import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { fetchAPIquestion } from '../redux/action';

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
    };
  }

  componentDidMount() {
    this.reciveAPI();
    this.handleTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 1) {
      this.setState({
        buttonDisabled: true,
      });
      clearInterval(this.id);
    }
  }

  getGravatar = () => {
    const { email } = this.props;
    return md5(email).toString();
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
    this.setState({
      arrayAPI: questionAPI.results,
      loading: true,
    }, () => this.randonQuestions());
  };

  randonQuestions = () => {
    const { arrayAPI, index } = this.state;
    const randomNumber = 0.5;
    if (arrayAPI.length > 0) {
      const answer = [arrayAPI[index].correct_answer,
        ...arrayAPI[index].incorrect_answers];
      const randomAnswer = answer.sort(() => Math.random() - randomNumber);
      this.setState({
        answers: randomAnswer,
      });
    }
  };

  handleTimer = () => {
    const interval = 1000;
    this.id = setInterval(() => {
      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
      );
    }, interval);
  };

  buttonClick = () => {
    this.setState({
      greenButton: { border: '3px solid rgb(6, 240, 15)' },
      redButton: { border: '3px solid red' },
      buttonClickNext: true,
    });
  };

  buttonNext = () => {
    const { history } = this.props;
    const { index, arrayAPI } = this.state;
    const feedbackNumber = 4;
    if (index < arrayAPI.length - 1) {
      this.setState({
        index: index + 1,
        greenButton: { border: '' },
        redButton: { border: '' },
        buttonClickNext: false,
      }, () => this.randonQuestions());
    }
    if (index === feedbackNumber) {
      history.push('/feedback');
    }
  };

  render() {
    const { name } = this.props;
    const { arrayAPI, loading, index, answers, buttonClickNext, redButton,
      greenButton, timer, buttonDisabled } = this.state;
    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${this.getGravatar()}` } alt="Imagem de perfil" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <span>Score: </span>
          <span data-testid="header-score">0</span>
        </header>
        { !loading
          ? <p>LOADING...</p>
          : (
            <section>
              <p data-testid="question-category">{ arrayAPI[index].category }</p>
              <p data-testid="question-text">{ arrayAPI[index].question }</p>
              <span data-testid="answer-options">
                { answers.map((answer, i) => (
                  (answer !== arrayAPI[index].correct_answer)
                    ? (
                      <button
                        key={ i }
                        type="button"
                        style={ redButton }
                        onClick={ this.buttonClick }
                        data-testid={ `wrong-answer-${i}` }
                        disabled={ buttonDisabled }
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
                        data-testid="correct-answer"
                        disabled={ buttonDisabled }
                      >
                        { answer }
                      </button>
                    )
                ))}
              </span>
              { buttonClickNext
                ? (
                  <div>
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.buttonNext }
                    >
                      Next
                    </button>
                  </div>
                )
                : (
                  <p> </p>
                )}
              <div>
                <h6>Tempo</h6>
                <h4>
                  { timer }
                </h4>
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
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(GamePage);
