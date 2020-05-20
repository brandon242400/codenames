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
    this.currentGame = new GameLogic();
    this.gameInstanceTimestamp = new Date().getTime();
    this.setTeam = this.setTeam.bind(this);
    this.establishSocketConnection = this.establishSocketConnection.bind(this);
    this.gameID = this.props.gameID;
    this.socket = null;
  }


  componentDidMount() {
    const { playersTeam } = this.props;
    this.setTeam(playersTeam);

    this.establishSocketConnection();

    // POST
    // fetch('/api/moves', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     sampleData: 'Sample data from the React client.',
    //   }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then(res => res.text())
    //   .then(res => console.log(res));
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
    // SOCKET.IO STUFF
    const { gameID } = this.props;
    this.socket = io();

    this.socket.on(`${gameID}: cards`, (cards) => {
      cards = JSON.parse(cards);
      console.log(cards);
    });
    console.log(`${gameID}\n\n`);
    this.socket.emit('send gameID', gameID);
  }


  render() {
    const { playersTeam, teamDisplay } = this.state;
    const contextData = {
      playersTeam,
      currentGame: this.currentGame,
      newGame: this.newGame,
      // socket: this.socket,
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
            {/* <TeamChange setTeam={this.setTeam} /> */}
            <CardContainer playersTeam={playersTeam} />
          </div>
          <RulesRight />
        </div>
      </AppContext.Provider>
    );
  }
}
