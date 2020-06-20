import React from 'react';
import PropTypes from 'prop-types';
import Card from './card/Card';
// import ScoreDisplay from './score-display/scoreDisplay';
import AssassinCard from '../end-game/assassinCardSelected';
import SpymasterEntry from '../spymaster-entry/spymasterEntry';
import StyledCardContainer from './cardContainerStyles';

export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAssassinCard: false,
      wordList: null,
    };
    const { currentGame, socketManager, playersTeam } = this.props;
    this.playersTeam = playersTeam;
    this.socketManager = socketManager;
    this.currentGame = currentGame;
    this.setAssassinCard = this.setAssassinCard.bind(this);
    this.changeInGameState = this.changeInGameState.bind(this);
  }

  componentDidMount() {
    this.setState({
      wordList: this.currentGame.wordList,
    });
    this.socketManager.onChangeInGameState(this.changeInGameState);
  }

  /** Sets the 'selectedAssassinCard' value when someone selects the card.
   *  @param {Boolean} val */
  setAssassinCard(val = true) {
    this.setState({ selectedAssassinCard: val });
  }

  /** Updates the currentGame and state info when there's a change on the server.
   *  @param {Object} data The server's version of the game */
  changeInGameState(data) {
    this.currentGame.setAllGameSessionData(data);
    this.setState({ wordList: this.currentGame.wordList });
  }

  render() {
    const { selectedAssassinCard, wordList } = this.state;
    return (
      <div>
        {/* {scores ? <ScoreDisplay scores={scores} socketManager={this.socketManager} /> : null} */}
        {(this.playersTeam === 'spyRed' || this.playersTeam === 'spyBlue')
          ? (
            <SpymasterEntry
              currentGame={this.currentGame}
              socketManager={this.socketManager}
              playersTeam={this.playersTeam}
            />
          )
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
            ? <AssassinCard losingTeam={this.playersTeam} />
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
