import React from 'react';
import PropTypes from 'prop-types';
import Card from './card/Card';
import ScoreDisplay from './score-display/scoreDisplay';
import AssassinCard from '../end-game/assassinCardSelected';
import SpymasterEntry from '../spymaster-entry/spymasterEntry';
import StyledCardContainer from './cardContainerStyles';


export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAssassinCard: false,
      wordList: null,
      scores: null,
    };
    const { currentGame, socketManager, playersTeam } = this.props;
    this.playersTeam = playersTeam;
    this.socketManager = socketManager;
    this.currentGame = currentGame;
    this.setAssassinCard = this.setAssassinCard.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.changeInGameState = this.changeInGameState.bind(this);
  }


  componentDidMount() {
    // this.changeInGameState();
    this.socketManager.onChangeInGameState(this.changeInGameState);
    this.getGameState();
  }


  /** Sets the 'selectedAssassinCard' value when someone selects the card.
   *  @param {Boolean} val */
  setAssassinCard(val = true) {
    this.setState({ selectedAssassinCard: val });
  }


  getGameState() {
    this.socketManager.getServerGameState()
      .then((res) => {
        this.currentGame.setAllGameSessionData(res);
        this.setState({
          wordList: res.wordList,
          scores: res.scores,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  }


  changeInGameState(data) {
    this.currentGame.setAllGameSessionData(data);
    this.setState({ wordList: this.currentGame.wordList });
  }


  render() {
    const { selectedAssassinCard, wordList, scores } = this.state;

    return (
      <div>
        {scores
          ? (
            <ScoreDisplay
              scores={scores}
              socketManager={this.socketManager}
            />
          ) : null}
        {(this.playersTeam === 'spyRed' || this.playersTeam === 'spyBlue')
          ? <SpymasterEntry currentGame={this.currentGame} playersTeam={this.playersTeam} />
          : null}
        <StyledCardContainer>
          {wordList ? wordList.map((word) => (
            <Card
              key={word.word}
              wordObj={word}
              currentGame={this.currentGame}
              playersTeam={this.playersTeam}
              setAssassinCard={this.setAssassinCard}
              socketManager={this.socketManager}
            />
          )) : null}
          {selectedAssassinCard
            ? (
              <AssassinCard
                losingTeam={this.playersTeam}
                startNewGame={() => null} /* <-- Need to add a way for a player to
                start a new game within the same gameID /uuid instance. */
              />
            )
            : null}
        </StyledCardContainer>
      </div>
    );
  }
}

CardContainer.propTypes = {
  currentGame: PropTypes.object.isRequired,
  socketManager: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
};
