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
      cards: null,
    };
    const { currentGame, socketManager, playersTeam } = this.props;
    this.playersTeam = playersTeam;
    this.socketManager = socketManager;
    this.currentGame = currentGame;
    this.createCards = this.createCards.bind(this);
    this.setAssassinCard = this.setAssassinCard.bind(this);
  }


  componentDidMount() {
    this.setState({ cards: this.createCards() });
  }


  /** Sets the 'selectedAssassinCard' value when someone selects the card.
   *  @param {Boolean} val */
  setAssassinCard(val = true) {
    this.setState({ selectedAssassinCard: val });
  }


  /** Generates and returns a list of cards from the wordList array given from the server. */
  createCards() {
    return this.currentGame.wordList.map((word) => (
      <Card
        key={word.word}
        currentGame={this.currentGame}
        playersTeam={this.playersTeam}
        setAssassinCard={this.setAssassinCard}
        wordObj={word}
      />
    ));
  }


  render() {
    const { selectedAssassinCard, cards } = this.state;

    return (
      <div>
        <ScoreDisplay socketManager={this.socketManager} />
        {(this.playersTeam === 'spyRed' || this.playersTeam === 'spyBlue')
          ? <SpymasterEntry currentGame={this.currentGame} playersTeam={this.playersTeam} />
          : null}
        <StyledCardContainer>
          {cards}
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
