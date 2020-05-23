import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import App from '../App';
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

  /**
   * On mount, renders page to allow user to join a game or create a new one.
   */
  componentDidMount() {
    this.setState({
      renderedPortion: (
        <CreateOrJoin
          createNewGame={this.createNewGame}
          joinGame={this.joinGame}
        />),
    });
  }

  /**
   * Called when the user has chosen their team and passes that as props to App.js.
   * @param {String} playersTeam Shorthand team name that's used throughout the application.
   * @param {String} teamDisplay Legible team name displayed on the screen during the game.
   */
  setPlayersTeam(playersTeam, teamDisplay) {
    const { gameID } = this.state;
    this.setState({
      renderedPortion: (
        <App
          playersTeam={playersTeam}
          teamDisplay={teamDisplay}
          gameID={gameID}
        />),
    });
  }

  /**
   * Method called to create a new game with a new uuid identifier which is
   * referred to as the 'gameID' throughout the rest of the application.
   */
  createNewGame() {
    const gameID = uuidv4();
    this.setState({
      gameID,
      renderedPortion: (
        <ChooseTeam
          setPlayersTeam={this.setPlayersTeam}
          gameID={gameID}
        />),
    });
  }

  /**
   * If the user enters a valid gameID, that ID is used to join that particular game.
   * @param {String} gameID of the game the user intends to join.
   */
  joinGame(gameID) {
    this.setState({
      gameID,
      renderedPortion: (
        <ChooseTeam
          setPlayersTeam={this.setPlayersTeam}
          gameID={gameID}
        />
      ),
    });
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
