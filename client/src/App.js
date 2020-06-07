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
    const { gameID } = props;
    this.currentGame = new GameLogic(gameID);
  }


  render() {
    const {
      teamDisplay, playersTeam, gameID, socketManager,
    } = this.props;

    return (
      <div className="App">
        <RulesLeft />
        <div>
          <h1>Codenames</h1>
          <p>{`Game ID: ${gameID}`}</p>
          <h4 style={{ textDecoration: 'underline' }}>{`Team: ${teamDisplay}`}</h4>
          <CardContainer
            currentGame={this.currentGame}
            socketManager={socketManager}
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
