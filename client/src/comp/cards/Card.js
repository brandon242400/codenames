import React from 'react';
import PropTypes from 'prop-types';
import CardView from './styles/cardView';


export default function Card(props) {
  const {
    currentGame,
    playersTeam,
    plusBlueScore,
    plusRedScore,
    setAssassinCard,
    wordObj,
  } = props;
  const { word, team, selected } = wordObj;
  const [simulatedState, forceRender] = React.useState('');

  /**
   *
   * @param {Event} e
   */
  const handleClick = (e) => {
    e.preventDefault();
    console.log(currentGame.teamsTurn, playersTeam);
    if (
      wordObj.selected
      || playersTeam === 'spyRed'
      || playersTeam === 'spyBlue'
    ) {
      return;
    } if (currentGame.teamsTurn !== playersTeam) {
      return;
    }
    wordObj.selected = true;
    if (team === 'red') {
      plusRedScore();
    } else if (team === 'blue') {
      plusBlueScore();
    } else if (team === 'assassin') { setAssassinCard(true); }
    forceRender(`* selected by ${
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
        simulatedState={simulatedState}
      />
    </>
  );
}


Card.propTypes = {
  // eslint-disable-next-line
  currentGame: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
  plusBlueScore: PropTypes.func.isRequired,
  plusRedScore: PropTypes.func.isRequired,
  setAssassinCard: PropTypes.func.isRequired,
  // eslint-disable-next-line
  wordObj: PropTypes.object.isRequired,
};
