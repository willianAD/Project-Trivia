import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  // buttonClick = () => {

  // };

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
          // onClick={ }
        >
          Play
        </button>
      </section>
    );
  }
}

export default connect()(Login);
