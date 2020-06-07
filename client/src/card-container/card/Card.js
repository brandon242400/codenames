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
    this.handleClick = this.handleClick.bind(this);
    this.cardChangeListener = this.cardChangeListener.bind(this);
  }


  componentDidMount() {
    this.cardChangeListener();
  }


  cardChangeListener() {
    const { wordObj, socketManager } = this.props;
    const socket = socketManager.getSocket();
    socket.on(`${wordObj.word}CardChanged`, (card) => {
      // eslint-disable-next-line
      console.log(card);
      const { card: thisCard } = this.state;
      if (thisCard.selected !== card.selected
        || thisCard.teamThatGuessed !== card.teamThatGuessed) {
        this.setState({ card });
      }
    });
  }


  /**
   * Checks if current user is allowed to select the given card.
   * If they are, marks the card as selected and attributes a point to the corresponding team.
   * @param {Event} e
   */
  handleClick(e) {
    e.preventDefault();
    const { currentGame, playersTeam } = this.props;
    const { card } = this.state;
    const wordObj = { ...card };

    // Making sure it's the current player's turn
    if (wordObj.selected) { return; }
    if (wordObj.teamThatGuessed) { return; }
    // if (playersTeam === 'spyRed') { return; }
    // if (playersTeam === 'spyBlue') { return; }
    // if (currentGame.teamsTurn !== playersTeam) { return; }

    // Setting wordObj and currentGame info before sending to server
    const { socketManager } = this.props;
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
