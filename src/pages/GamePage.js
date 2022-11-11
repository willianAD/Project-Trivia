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

  render() {
    const { name } = this.props;
    const { arrayAPI, loading, index, answers } = this.state;
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
                      <button key={ i } type="button" data-testid={ `wrong-answer-${i}` }>
                        { answer }
                      </button>
                    )
                    : (
                      <button key="correct" type="button" data-testid="correct-answer">
                        { answer }
                      </button>
                    )
                ))}
              </span>
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
