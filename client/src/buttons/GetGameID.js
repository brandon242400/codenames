import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styles/styledButton';


export default function GetGameID(props) {
  const { gameID } = props;

  return (
    <div>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => { navigator.clipboard.writeText(gameID); }}
        style={{ marginTop: '3vh' }}
      >
        Copy Game ID
      </StyledButton>
    </div>
  );
}


GetGameID.propTypes = {
  gameID: PropTypes.string.isRequired,
};
