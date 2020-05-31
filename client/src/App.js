import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import CardContainer from './card-container/CardContainer';
import RulesLeft from './rules/RulesLeft';
import RulesRight from './rules/RulesRight';
import GameLogic from './modules/game-logic/GameLogic';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { gameID, socketManager } = props;
    this.currentGame = new GameLogic(gameID);
    this.socketManager = socketManager;
    this.establishSocketConnection = this.establishSocketConnection.bind(this);
  }


  componentDidMount() {
    this.establishSocketConnection();
  }


  /** Gets cards from server and stores them in this.currentGame */
  establishSocketConnection() {
    this.socketManager.getCards()
      .then((res) => {
        this.currentGame.wordList = res;
        // eslint-disable-next-line no-console
        console.log(res);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }


  render() {
    const { teamDisplay, playersTeam } = this.props;

    return (
      <div className="App">
        <RulesLeft />
        <div>
          <h1>Codenames</h1>
          <h4 style={{ textDecoration: 'underline' }}>
            {`Team: ${teamDisplay}`}
          </h4>
          <CardContainer
            currentGame={this.currentGame}
            socketManager={this.socketManager}
            playersTeam={playersTeam}
          />
        </div>
        <RulesRight />
      </div>
    );
  }
}

App.propTypes = {
  gameID: PropTypes.string.isRequired,
  playersTeam: PropTypes.string.isRequired,
  teamDisplay: PropTypes.string.isRequired,
  socketManager: PropTypes.object.isRequired,
};
