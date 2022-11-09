import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <p>Game Page</p>
    );
  }
}

export default connect()(GamePage);
