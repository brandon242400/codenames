import React from 'react';
import PropTypes from 'prop-types';
import {
  enemyCardStyle,
  friendlyCardStyle,
  bystanderCardStyle,
  bystanderCardStyleSelected,
  assassinCardStyle,
} from './cardStyles';

export default function cardView(props) {
  const {
    playersTeam,
    wordObj,
    handleClick,
  } = props;

  /* Sets the view container for the card depending on which team the user is on. Makes sure the
  spymasters see everything but others only see cards that have already been selected. */
  let SpyViewContainer;
  if (playersTeam === 'spyRed' || playersTeam === 'spyBlue' || wordObj.selected === true) {
    switch (wordObj.team) {
      case 'red':
        if (playersTeam === 'red' || playersTeam === 'spyRed') {
          SpyViewContainer = friendlyCardStyle;
        } else SpyViewContainer = enemyCardStyle;
        break;
      case 'blue':
        if (playersTeam === 'blue' || playersTeam === 'spyBlue') {
          SpyViewContainer = friendlyCardStyle;
        } else SpyViewContainer = enemyCardStyle;
        break;
      case 'assassin':
        SpyViewContainer = assassinCardStyle;
        break;
      default:
        SpyViewContainer = bystanderCardStyleSelected;
    }
  } else SpyViewContainer = bystanderCardStyle;


  return (
    <SpyViewContainer onClick={handleClick}>
      <h5>{wordObj.word}</h5>
    </SpyViewContainer>
  );
}

cardView.propTypes = {
  playersTeam: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  wordObj: PropTypes.object.isRequired,
};
