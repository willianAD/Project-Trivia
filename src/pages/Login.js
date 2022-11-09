import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin, fetchAPItoken, tokenAPI } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonDisable: true,
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
    const { email } = this.state;
    const myToken = await fetchAPItoken();
    localStorage.setItem('token', (myToken.token));
    dispatch(tokenAPI(myToken.token));
    dispatch(userLogin(email));
    history.push('/gamepage');
  };

  render() {
    const { name, email, buttonDisable } = this.state;
    return (
      <section>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="digite seu email"
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
            placeholder="digite seu name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ buttonDisable }
          onClick={ this.buttonClick }
        >
          Play
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
