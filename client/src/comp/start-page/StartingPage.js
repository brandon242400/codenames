import React from "react";
import App from '../../App';
import CreateOrJoin from './pregame-options/CreateOrJoin';
import ChooseTeam from './pregame-options/chooseTeam';

export default class StartingPage extends React.Component {
  constructor() {
    super();
    this.state = { renderedPortion: <></> };
    this.setPlayersTeam = this.setPlayersTeam.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      renderedPortion:
        <CreateOrJoin
          createNewGame={this.createNewGame}
          joinGame={this.joinGame}
        />
    });
  }

  setPlayersTeam(playersTeam) {
    this.setState({ renderedPortion: <App playersTeam={playersTeam} /> });
  }

  createNewGame() {
    this.setState({
      renderedPortion: <ChooseTeam setPlayersTeam={this.setPlayersTeam} />,
    });
  }

  joinGame(gameID) {
    // Check with server for valid game ID
    // If not valid, ask to be entered again
    // Else, allow user to choose team and then join the game lobby
    if (gameID) {
      console.log('Joined imaginary game with ID: ' + gameID);
    } else { return false; }
  }


  render() {
    const { renderedPortion } = this.state;

    return (
      <div>
        {renderedPortion}
      </div>
    )
  }
}
