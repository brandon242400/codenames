import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import App from '../../App';
import CreateOrJoin from './pregame-options/CreateOrJoin';
import ChooseTeam from './pregame-options/chooseTeam';

export default class StartingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      renderedPortion: <></>,
      gameID: '',
    };
    this.setPlayersTeam = this.setPlayersTeam.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      renderedPortion: (
        <CreateOrJoin
          createNewGame={this.createNewGame}
          joinGame={this.joinGame}
        />),
    });
  }

  setPlayersTeam(playersTeam) {
    const { gameID } = this.state;
    this.setState({
      renderedPortion: (
        <App
          playersTeam={playersTeam}
          gameID={gameID}
        />),
    });
  }

  createNewGame() {
    const gameID = uuidv4();
    this.setState({
      renderedPortion: (
        <ChooseTeam
          setPlayersTeam={this.setPlayersTeam}
          gameID={gameID}
        />),
      gameID,
    });
  }

  joinGame(gameID) {
    if (gameID) {
      // eslint-disable-next-line no-console
      console.log(`Joined game with ID: ${gameID}`);
      this.setState({
        gameID,
      });
      return true;
    }
    return false;
  }


  render() {
    const { renderedPortion } = this.state;

    return (
      <div>
        {renderedPortion}
      </div>
    );
  }
}
