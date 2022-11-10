import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  getGravatar = () => {
    const { email } = this.props;
    return md5(email).toString();
  };

  render() {
    const { name } = this.props;
    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${this.getGravatar()}` } alt="Imagem de perfil" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <span>Score: </span>
          <span data-testid="header-score">0</span>
        </header>
        <section>
          <p data-testid="question-category"> </p>
          <p data-testid="question-text"> </p>
          <div data-testid="answer-options">
            <button type="button">{}</button>
            <button type="button">{}</button>
            <button type="button">{}</button>
            <button type="button">{}</button>
          </div>
        </section>
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
};

export default connect(mapStateToProps)(GamePage);
