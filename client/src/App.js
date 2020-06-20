import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardContainer from './card-container/CardContainer';
import GameLogic from './modules/game-logic/GameLogic';
import SpymasterHintDisplay from './spymaster-display/SpymasterHintDisplay';
import ScoreLimitReached from './end-game/scoreLimitReached';
import RulesPopUp from './rules/rulesPopUp';
import ScoreDisplay from './card-container/score-display/scoreDisplay';
import GetGameID from './buttons/GetGameID';
import colors from './constants/colors';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataResolved: false };
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
    const { playersTeam, socketManager } = this.props;

    if (dataResolved) {
      return (
        <>
          <div className="App">
            <MainTitle>CODENAMES</MainTitle>
            <div className="main-content">
              <div className="left-panel">
                <ScoreDisplay
                  scores={this.currentGame.scores}
                  socketManager={socketManager}
                  playersTeam={playersTeam}
                />
                <SpymasterHintDisplay
                  socketManager={socketManager}
                  currentGame={this.currentGame}
                />
              </div>
              <div className="center-panel">
                <ScoreLimitReached socketManager={socketManager} playersTeam={playersTeam} />
                <CardContainer
                  currentGame={this.currentGame}
                  socketManager={socketManager}
                  playersTeam={playersTeam}
                />
              </div>
              <div className="right-panel">
                <RulesPopUp />
                <GetGameID gameID={this.currentGame.gameID} />
              </div>
            </div>
          </div>
        </>
      );
    } return <></>;
  }
}

App.propTypes = {
  gameID: PropTypes.string.isRequired,
  playersTeam: PropTypes.string.isRequired,
  socketManager: PropTypes.object.isRequired,
};

const MainTitle = styled.h1`
  font-family: 'Roboto Mono', monospace;
  font-size: 200%;
  text-decoration: underline;
  color: ${colors.primary};
  font-weight: 600;
`;
