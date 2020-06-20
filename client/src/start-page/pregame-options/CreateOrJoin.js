import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../constants/colors';
import StyledButton from '../../buttons/styles/styledButton';


export default function CreateOrJoin(props) {
  const [joiningGame, setJoiningGame] = React.useState(false);
  const [gameIDEntry, setGameIDEntry] = React.useState('');
  const [invalidEntry, setInvalidEntry] = React.useState(false);
  const { createNewGame, joinGame } = props;

  /** Checks with server to see if the gameID is a valid session.
   *  Joins if valid or alerts user if it's not. */
  const validateIDandJoin = () => {
    fetch('/api/validate-gameid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameID: gameIDEntry }),
    }).then((res) => res.json())
      .then((res) => {
        if (res.validID) {
          joinGame(gameIDEntry);
        } else {
          setInvalidEntry(true);
        }
      });
  };

  /** Called when user clicks 'join game'. Displays the game ID entry upon clicking. */
  const joinGameButtonPressed = (e) => {
    e.preventDefault();
    if (joiningGame) {
      validateIDandJoin();
    } else { setJoiningGame(true); }
  };

  return (
    <Container>
      <h2>Welcome to codenames</h2>
      <StyledButton
        variant="contained"
        color="primary"
        size="large"
        onClick={createNewGame}
      >
        Create
      </StyledButton>
      <StyledButton
        variant="contained"
        color="primary"
        size="large"
        onClick={joinGameButtonPressed}
      >
        {joiningGame ? 'Enter Lobby' : 'Join'}
      </StyledButton>
      <br />
      {joiningGame
        ? (
          <TextField
            error={invalidEntry}
            helperText={invalidEntry ? 'Invalid Game ID. Try Again' : null}
            id="standard-basic"
            label="Paste Lobby Code"
            InputLabelProps={{
              style: {
                color: colors.primary,
                fontFamily: "'Roboto Mono', monospace",
                fontWeight: 500,
              },
            }}
            InputProps={{
              style: {
                color: colors.primary,
                width: '20vw',
                fontFamily: "'Roboto Mono', monospace",
              },
            }}
            style={{ marginTop: '50px' }}
            onChange={(e) => setGameIDEntry(e.target.value)}
            value={gameIDEntry}
          />
        )
        : null}
    </Container>
  );
}

CreateOrJoin.propTypes = {
  createNewGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
};

// Styles used for the page.
const Container = styled.div`
  background-color: ${colors.neutralLight};
  text-align: center;
  padding-top: 100px;
  
  h2 {
    color: ${colors.primary};
    font-family: 'Roboto Mono', monospace;
    font-size: 175%;
    font-weight: 500;
    margin-bottom: 150px;
  }
`;
