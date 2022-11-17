import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Configuracoes from './pages/Configuracoes';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <img src={ logo } className="App-logo" alt="logo" />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/gamepage" component={ GamePage } />
        <Route path="/settings" component={ Configuracoes } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
