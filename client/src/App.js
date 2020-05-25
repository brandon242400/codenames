import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import AppContext from './modules/context/AppContext';
import CardContainer from './card-container/CardContainer';
import RulesLeft from './rules/RulesLeft';
import RulesRight from './rules/RulesRight';
import GameLogic from './modules/game-logic/GameLogic';
import SocketManager from './modules/socket/SocketManager';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socketManager = null;
    this.currentGame = null;
    this.establishSocketConnection = this.establishSocketConnection.bind(this);
  }


  componentDidMount() {
    const { gameID } = this.props;
    this.currentGame = new GameLogic(gameID);
    this.socketManager = new SocketManager(gameID);
    this.establishSocketConnection();
  }


  /* Gets cards from server and stores them in this.currentGame */
  establishSocketConnection() {
    this.socketManager.getCards()
      .then((res) => {
        this.currentGame.wordList = res;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }


  render() {
    const { playersTeam, teamDisplay } = this.props;
    const contextData = {
      playersTeam,
      currentGame: this.currentGame,
      socketManager: this.socketManager,
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
            {/* <CardContainer /> */}
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
