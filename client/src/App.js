import React from 'react';
import './App.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import AppContext from './context/AppContext';
import CardContainer from './comp/cards/CardContainer';
import RulesLeft from './comp/rules/RulesLeft';
import RulesRight from './comp/rules/RulesRight';
import GameLogic from './game-logic/GameLogic';
// import TeamChange from './comp/team-change-ui/teamChangeButtons';


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
    // this.testSocket = this.testSocket.bind(this);
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

    this.socket.on('cards', (cards) => {
      this.currentGame.wordList = cards;
    });

    this.socket.emit('send_gameID', this.currentGame.gameID);
  }


  // testSocket() {
  //   // eslint-disable-next-line
  //   console.log(this.socket.id);
  //   this.socket.emit('card_selected', { socketID: this.socket.id });
  // }


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
            {/* <button type="button" onClick={this.testSocket}>Test Socket</button> */}
            <h4 style={{ textDecoration: 'underline' }}>
              {`Team: ${teamDisplay}`}
            </h4>
            {/* <TeamChange setTeam={this.setTeam} /> */}
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
