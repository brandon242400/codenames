import React from 'react';
import PropTypes from 'prop-types';
import CardView from './style/cardView';


export default class Card extends React.Component {
  constructor(props) {
    super(props);
    const { wordObj } = props;
    this.state = {
      card: wordObj,
    };
    this.canPlayerGuess = this.canPlayerGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** Returns true if the player can select this card. */
  canPlayerGuess() {
    const { card: wordObj } = this.state;
    const { playersTeam, currentGame } = this.props;
    if (wordObj.selected || wordObj.teamThatGuessed) { return false; }
    if (playersTeam === 'spyRed' || playersTeam === 'spyBlue') { return false; }
    if (currentGame.teamsTurn !== playersTeam) { return false; }
    return true;
  }

  /** Checks if current user is allowed to select the given card.
   *  If they are, marks the card as selected and attributes a point to the corresponding team.
   *  @param {Event} e */
  handleClick(e) {
    e.preventDefault();
    const { socketManager } = this.props;
    const { currentGame, playersTeam } = this.props;
    const { card } = this.state;
    const wordObj = { ...card };

    if (!this.canPlayerGuess()) { return; }
    wordObj.selected = true;
    wordObj.teamThatGuessed = playersTeam;
    currentGame.guessCard(wordObj, playersTeam);
    socketManager.sendChangeInGameState(currentGame, wordObj);
    // if (wordObj.team === 'assassin') { setAssassinCard(true); }

    this.setState({ card: wordObj });
  }


  render() {
    const { playersTeam } = this.props;
    const { card } = this.state;
    return (
      <CardView
        handleClick={this.handleClick}
        wordObj={card}
        playersTeam={playersTeam}
      />
    );
  }
}

Card.propTypes = {
  playersTeam: PropTypes.string.isRequired,
  // setAssassinCard: PropTypes.func.isRequired,
  currentGame: PropTypes.object.isRequired,
  wordObj: PropTypes.object.isRequired,
  socketManager: PropTypes.object.isRequired,
};
