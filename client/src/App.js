import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import CardContainer from './card-container/CardContainer';
import RulesLeft from './rules/RulesLeft';
import RulesRight from './rules/RulesRight';
import GameLogic from './modules/game-logic/GameLogic';
import SpymasterHintDisplay from './spymaster-display/SpymasterHintDisplay';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResolved: false,
    };
    const { gameID } = props;
    this.currentGame = new GameLogic(gameID);
    this.getGameState = this.getGameState.bind(this);
  }


  componentDidMount() {
    this.getGameState();
  }


  /** Gets the current/initial game state from the server. */
  getGameState() {
    const { socketManager } = this.props;
    socketManager.getServerGameState()
      .then((res) => {
        this.currentGame.setAllGameSessionData(res);
        this.setState({ dataResolved: true });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  }


  render() {
    const { dataResolved } = this.state;
    const {
      teamDisplay, playersTeam, gameID, socketManager,
    } = this.props;

    return (
      <div className="App">
        <RulesLeft />
        <div>
          <h1>Codenames</h1>
          <p>{`Game ID: ${gameID}`}</p>
          {dataResolved
            ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <h4 style={{ textDecoration: 'underline' }}>{`Team: ${teamDisplay}`}</h4>
                  <SpymasterHintDisplay
                    socketManager={socketManager}
                    currentGame={this.currentGame}
                  />
                </div>
                <CardContainer
                  currentGame={this.currentGame}
                  socketManager={socketManager}
                  playersTeam={playersTeam}
                />
              </>
            ) : null}
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
