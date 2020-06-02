import React from 'react';
import PropTypes from 'prop-types';
import CardView from './style/cardView';


export default function Card(props) {
  const {
    currentGame,
    playersTeam,
    setAssassinCard,
    wordObj,
    socketManager,
  } = props;
  // const [teamThatSelectedCard, setTeamThatSelectedCard] = React.useState(wordObj.teamThatGuessed);


  /** If the card broadcasted is this one then this card is modified to reflect the broadcasted.
   *  @param {object} card wordObj and card are different versions of the same thing */
  // const compareCards = (card) => {
  //   if (card.word !== wordObj.word) {
  //     return;
  //   }
  //   wordObj.selected = card.selected;
  //   wordObj.teamThatGuessed = card.teamThatGuessed;
  //   setTeamThatSelectedCard(card.teamThatGuessed);
  //   // eslint-disable-next-line no-console
  //   console.log(card);
  //   // eslint-disable-next-line no-console
  //   console.log(currentGame.wordList);
  // };


  // Setting listener for when another player selects this card.
  // socketManager.cardSelectedListener()
  //   .then((res) => {
  //     compareCards(res);
  //   }).catch((error) => {
  //     // eslint-disable-next-line no-console
  //     console.log(error.message);
  //   });


  /**
   * Checks if current user is allowed to select the given card.
   * If they are, marks the card as selected and attributes a point to the corresponding team.
   * @param {Event} e
   */
  const handleClick = (e) => {
    e.preventDefault();

    // Making sure it's the current player's turn
    if (wordObj.selected) { return; }
    // if (playersTeam === 'spyRed') { return; }
    // if (playersTeam === 'spyBlue') { return; }
    // if (currentGame.teamsTurn !== playersTeam) { return; }

    // Setting wordObj and currentGame info before sending to server
    wordObj.selected = true;
    wordObj.teamThatGuessed = playersTeam;
    currentGame.guessCard(wordObj, playersTeam);
    socketManager.sendSelectedCard(wordObj, currentGame);
    if (wordObj.team === 'assassin') { setAssassinCard(true); }

    // Setting text on card to display who picked it
    // setTeamThatSelectedCard(`* selected by ${
    //   playersTeam.charAt(0).toUpperCase()
    //   + playersTeam.substring(1)} *`);
  };


  return (
    <>
      <CardView
        handleClick={handleClick}
        wordObj={wordObj}
        playersTeam={playersTeam}
        // teamThatSelectedCard={teamThatSelectedCard}
      />
    </>
  );
}

Card.propTypes = {
  playersTeam: PropTypes.string.isRequired,
  setAssassinCard: PropTypes.func.isRequired,
  currentGame: PropTypes.object.isRequired,
  wordObj: PropTypes.object.isRequired,
  socketManager: PropTypes.object.isRequired,
};
