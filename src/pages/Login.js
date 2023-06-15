import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin, fetchAPItoken, tokenAPI, changePoints } from '../redux/action';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonDisable: true,
      score: 0,
      assertion: 0,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const { name, email } = this.state;
    const rejexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && name.length > 0);

    this.setState({
      buttonDisable: !validate,
    });
  };

  buttonClick = async () => {
    const { history, dispatch } = this.props;
    const { email, name, score, assertion } = this.state;
    const myToken = await fetchAPItoken();

    localStorage.setItem('token', (myToken.token));
    localStorage.setItem('name', (name));
    localStorage.setItem('email', (email));

    dispatch(tokenAPI(myToken));
    dispatch(userLogin({ email, name }));
    dispatch(changePoints({ email, name, score, assertion }));

    history.push('/gamepage');
  };

  render() {
    const { name, email, buttonDisable } = this.state;
    return (
      <section className="login">
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Type your e-mail"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Type your name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          className="button-play"
          disabled={ buttonDisable }
          onClick={ this.buttonClick }
        >
          PLAY
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
