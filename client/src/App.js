import React from 'react';
import './App.css';
import AppContext from './context/AppContext';
import CardContainer from './comp/cards/CardContainer';
import RulesLeft from './comp/rules/RulesLeft';
import RulesRight from './comp/rules/RulesRight';
import GameLogic from './game-logic/GameLogic';
// import TeamChange from './comp/team-change-ui/teamChangeButtons';
// import io from 'socket.io-client';


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
  }


  componentDidMount() {
    const { playersTeam } = this.props;
    this.setTeam(playersTeam);

    // SOCKET.IO STUFF
    // this.socket = io();
    // this.socket.on('connect', () => {
    //   console.log(this.socket.id);
    // })

    // GET
    // fetch('/api/moves')
    //   .then(res => {
    //     console.log(res);
    //     return res.text();
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });

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


  render() {
    const { playersTeam, teamDisplay } = this.state;
    const contextData = {
      playersTeam,
      currentGame: this.currentGame,
      newGame: this.newGame,
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
