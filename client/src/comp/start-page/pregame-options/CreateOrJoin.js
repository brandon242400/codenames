import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export default function CreateOrJoin(props) {
  const [joiningGame, setJoiningGame] = React.useState(false);
  const [gameIDEntry, setGameIDEntry] = React.useState('');
  const { createNewGame, joinGame } = props;


  // Checks with server to see if the gameID is a valid session. Joins if valid and alerts if not.
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
          // eslint-disable-next-line no-alert
          alert('Invalid lobby ID. Please verify and try again.');
        }
      });
  };


  // Called when user presses 'join game'. Displays the game ID entry upon clicking.
  const joinGameButtonPressed = (e) => {
    e.preventDefault();
    if (joiningGame) {
      validateIDandJoin();
    } else { setJoiningGame(true); }
  };


  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={createNewGame}
        style={{
          marginRight: '10vw',
        }}
      >
        Create
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={joinGameButtonPressed}
      >
        {joiningGame ? 'Enter Lobby' : 'Join'}
      </Button>
      <br />
      {joiningGame
        ? (
          <TextField
            id="standard-basic"
            label="Paste Lobby Code"
            InputLabelProps={{ style: { color: '#999' } }}
            InputProps={{ style: { color: '#99e', width: '20vw' } }}
            style={{ marginTop: '2vh' }}
            onChange={(e) => setGameIDEntry(e.target.value)}
            value={gameIDEntry}
          />
        )
        : null}
    </Container>
  );
}

// Styles used for the page.
const Container = styled.div`
  background-color: #444;
  text-align: center;
  padding-top: 30vh;
  height: 70vh;
`;

CreateOrJoin.propTypes = {
  createNewGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
};
