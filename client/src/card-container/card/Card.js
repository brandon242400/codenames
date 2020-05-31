import React from 'react';
import PropTypes from 'prop-types';
import CardView from './style/cardView';


export default function Card(props) {
  const {
    currentGame,
    playersTeam,
    setAssassinCard,
    wordObj,
    socket,
  } = props;
  const [teamThatSelectedCard, setTeamThatSelectedCard] = React.useState(wordObj.teamThatGuessed);


  /** Checks if current user is allowed to select the given card.
   *  If they are, marks the card as selected and attributes a point to the corresponding team.
   *  @param {Event} e */
  const handleClick = (e) => {
    e.preventDefault();
    // Making sure it's the player's turn that's guessing
    if (
      wordObj.selected
      || playersTeam === 'spyRed'
      || playersTeam === 'spyBlue'
    ) { return; }
    if (currentGame.teamsTurn !== playersTeam) {
      return;
    }
    wordObj.selected = true;

    // Setting text below card to display the team that selected it
    if (wordObj.team === 'red') {
      socket.emit('addPointToTeam', { team: 'red' }); // <-- Needs revision
    } else if (wordObj.team === 'blue') {
      socket.emit('addPointToTeam', { team: 'blue' }); // <-- Needs revision
    } else if (wordObj.team === 'assassin') {
      setAssassinCard(true);
    }
    setTeamThatSelectedCard(`* selected by ${
      playersTeam.charAt(0).toUpperCase()
      + playersTeam.substring(1)} *`);
    // Passing choice to GameLogic.js to adjust amount of guesses left, whos turn it is, etc.
    currentGame.guessCard(wordObj, playersTeam);
  };


  return (
    <>
      <CardView
        handleClick={handleClick}
        wordObj={wordObj}
        playersTeam={playersTeam}
        teamThatSelectedCard={teamThatSelectedCard}
      />
    </>
  );
}

Card.propTypes = {
  playersTeam: PropTypes.string.isRequired,
  setAssassinCard: PropTypes.func.isRequired,
  currentGame: PropTypes.object.isRequired,
  wordObj: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};
