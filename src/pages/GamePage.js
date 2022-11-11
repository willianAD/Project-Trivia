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
    };
  }

  componentDidMount() {
    this.reciveAPI();
    this.randonQuestions();
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
    });
  };

  randonQuestions = () => {
    const { arrayAPI } = this.state;
    const randomNumber = 0.5;
    if (arrayAPI.length > 0) {
      const answer = arrayAPI.map((api) => api.incorrect_answers);
      // [api.incorrect_answers, api.correct_answer]
      const randomAnswer = answer.sort(() => Math.random() - randomNumber);
      this.setState({
        answers: randomAnswer,
      });
    }
  };

  render() {
    const { name } = this.props;
    const { arrayAPI, loading, index, answers } = this.state;
    console.log(answers);
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
              <p data-testid="question-category">{ arrayAPI[0].category }</p>
              <p data-testid="question-text">{ arrayAPI[0].question }</p>
              <div data-testid="answer-options">
                <button type="button" data-testid={ `wrong-answer-${0}` }>
                  { arrayAPI[index].incorrect_answers[0] }
                </button>
                <button type="button" data-testid={ `wrong-answer-${1}` }>
                  { arrayAPI[index].incorrect_answers[1] }
                </button>
                <button type="button" data-testid={ `wrong-answer-${2}` }>
                  { arrayAPI[index].incorrect_answers[2] }
                </button>
                <button type="button" data-testid="correct-answer">
                  { arrayAPI[index].correct_answer }
                </button>
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
