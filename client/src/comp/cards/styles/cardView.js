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
    team,
    word,
    playersTeam,
    selected,
    simulatedState,
    handleClick,
  } = props;

  let SpyViewContainer;
  if ((playersTeam === 'red' || playersTeam === 'blue') && !selected) {
    SpyViewContainer = bystanderCardStyle;
  } else if (team === 'red') {
    SpyViewContainer = redCardStyle;
  } else if (team === 'blue') {
    SpyViewContainer = blueCardStyle;
  } else if (team === 'assassin') {
    SpyViewContainer = assassinCardStyle;
  } else { SpyViewContainer = bystanderCardStyle; }


  return (
    <SpyViewContainer onClick={handleClick}>
      <h5>{word}</h5>
      {selected
        ? <h5>{simulatedState}</h5>
        : null}
    </SpyViewContainer>
  );
}

cardView.propTypes = {
  team: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  playersTeam: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  simulatedState: PropTypes.string,
};

cardView.defaultProps = {
  simulatedState: '',
};
