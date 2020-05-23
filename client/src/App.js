import React from 'react';
import './App.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import AppContext from './modules/context/AppContext';
import CardContainer from './card-container/CardContainer';
import RulesLeft from './rules/RulesLeft';
import RulesRight from './rules/RulesRight';
import GameLogic from './modules/game-logic/GameLogic';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { gameID } = this.props;
    this.socket = null;
    this.currentGame = new GameLogic(gameID);
    this.establishSocketConnection = this.establishSocketConnection.bind(this);
  }


  componentDidMount() {
    this.establishSocketConnection();
  }


  /**
   * Initializes socket object to connect to server.
   * Sets listener to retrieve cards from the server to use for the game.
   * Sends gameID to server to check whether player is joining a game or starting a new one.
   */
  establishSocketConnection() {
    this.socket = io();
    this.socket.on('cards', (cards) => {
      this.currentGame.wordList = cards;
    });
    this.socket.emit('sendGameID', this.currentGame.gameID);
  }


  render() {
    const { playersTeam, teamDisplay } = this.props;
    const contextData = {
      playersTeam,
      currentGame: this.currentGame,
      socket: this.socket,
    };

    return (
      <AppContext.Provider value={contextData}>
        <div className="App">
          <RulesLeft />
          <div>
            <h1>Codenames</h1>
            <h4 style={{ textDecoration: 'underline' }}>
              {`Team: ${teamDisplay}`}
            </h4>
            <CardContainer />
          </div>
          <RulesRight />
        </div>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  gameID: PropTypes.string.isRequired,
  playersTeam: PropTypes.string.isRequired,
  teamDisplay: PropTypes.string.isRequired,
};
