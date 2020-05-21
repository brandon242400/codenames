import React from 'react';
import './App.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import AppContext from './context/AppContext';
import CardContainer from './comp/cards/CardContainer';
import RulesLeft from './comp/rules/RulesLeft';
import RulesRight from './comp/rules/RulesRight';
import GameLogic from './game-logic/GameLogic';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersTeam: '',
      teamDisplay: '',
    };
    const { gameID } = this.props;
    this.currentGame = new GameLogic(gameID);
    this.gameInstanceTimestamp = new Date().getTime();
    this.setTeam = this.setTeam.bind(this);
    this.establishSocketConnection = this.establishSocketConnection.bind(this);
    this.socket = null;
  }


  componentDidMount() {
    const { playersTeam } = this.props;
    this.setTeam(playersTeam);
    this.establishSocketConnection();
  }


  /**
   * Sets the team that the player will be placed on.
   * @param {String} team name
   */
  setTeam(playersTeam) {
    let teamDisplay = playersTeam;
    switch (teamDisplay) {
      case 'red':
        teamDisplay = 'Red';
        break;
      case 'blue':
        teamDisplay = 'Blue';
        break;
      case 'spyRed':
        teamDisplay = 'Red Team\'s Spy';
        break;
      default:
        teamDisplay = 'Blue Team\'s Spy';
        break;
    }
    this.setState(() => ({
      teamDisplay,
      playersTeam,
    }));
  }


  establishSocketConnection() {
    this.socket = io();
    // Retrieves cards from server to use in game
    this.socket.on('cards', (cards) => {
      this.currentGame.wordList = cards;
    });
    // Sends game ID to server
    this.socket.emit('send_gameID', this.currentGame.gameID);
  }


  render() {
    const { playersTeam, teamDisplay } = this.state;
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
            <CardContainer playersTeam={playersTeam} />
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
};
