import React from 'react';
import PropTypes from 'prop-types';
import {
  blueCardStyle,
  redCardStyle,
  bystanderCardStyle,
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
  if ((playersTeam === 'red' || playersTeam === 'blue') && !wordObj.selected) {
    SpyViewContainer = bystanderCardStyle;
  } else if (wordObj.team === 'red') {
    SpyViewContainer = redCardStyle;
  } else if (wordObj.team === 'blue') {
    SpyViewContainer = blueCardStyle;
  } else if (wordObj.team === 'assassin') {
    SpyViewContainer = assassinCardStyle;
  } else { SpyViewContainer = bystanderCardStyle; }


  return (
    <SpyViewContainer onClick={handleClick}>
      <h5>{wordObj.word}</h5>
      {wordObj.selected
        ? <h5>{`* Selected by ${wordObj.teamThatGuessed} team *`}</h5>
        : null}
    </SpyViewContainer>
  );
}

cardView.propTypes = {
  playersTeam: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  wordObj: PropTypes.object.isRequired,
};
