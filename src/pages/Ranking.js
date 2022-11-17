import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  // componentDidMount() {
  //   const save = localStorage.getItem('ranking');
  //   const json = JSON.parse(save);
  //   const order = save.sort((a, b) => b.score - a.score);
  //   this.setState({ json: save });
  // }

  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <section>
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => this.handleButton() }
            >
              Voltar ao Início
            </button>
          </Link>
          <ol>
            {
              ranking.map((player, index) => (
                <li key={ index }>
                  <p
                    data-testid={ `player-name-$
                {index}` }
                  >
                    { player.name }

                  </p>
                  <p
                    data-testid={ `player-score-$
            {index}` }
                  >
                    { player.score }
                  </p>
                  <img src={ player.picture } alt={ player.picture } />
                </li>
              ))
            }
          </ol>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
