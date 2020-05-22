/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CardView from './styles/cardView';


export default function Card(props) {
  const {
    currentGame,
    playersTeam,
    setAssassinCard,
    wordObj,
    socket,
  } = props;
  // Variables pertaining to the card object being passed.
  const {
    word,
    team,
    selected,
    teamThatGuessed,
  } = wordObj;
  const [teamThatSelectedCard, setTeamThatSelectedCard] = React.useState(teamThatGuessed);


  /**
   * Checks if current user is allowed to select the given card.
   * If they are, marks the card as selected and attributes a point to the corresponding team.
   * @param {Event} e
   */
  const handleClick = (e) => {
    e.preventDefault();
    if (
      wordObj.selected
      || playersTeam === 'spyRed'
      || playersTeam === 'spyBlue'
    ) { return; }
    if (currentGame.teamsTurn !== playersTeam) {
      return;
    }
    wordObj.selected = true;
    if (team === 'red') {
      socket.emit('addPointToTeam', { team: 'red' });
    } else if (team === 'blue') {
      socket.emit('addPointToTeam', { team: 'blue' });
    } else if (team === 'assassin') {
      setAssassinCard(true);
    }
    setTeamThatSelectedCard(`* selected by ${
      playersTeam.charAt(0).toUpperCase()
      + playersTeam.substring(1)} *`);
    currentGame.guessCard(wordObj, playersTeam);
  };


  return (
    <>
      <CardView
        handleClick={handleClick}
        team={team}
        word={word}
        playersTeam={playersTeam}
        selected={selected}
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
