import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CreateOrJoin(props) {
  const [showEntry, setShowEntry] = React.useState(false);
  const [userEntry, setUserEntry] = React.useState('');
  const { createNewGame, joinGame } = props;

  const joinButtonPressed = (e) => {
    e.preventDefault();
    if (showEntry) {
      fetch('/api/validate-gameid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameID: userEntry }),
      }).then((res) => res.json())
        .then((res) => {
          if (res.validID) {
            joinGame(userEntry);
          } else {
            // eslint-disable-next-line no-alert
            alert('Invalid lobby ID. Please verify and try again.');
          }
        });
    } else { setShowEntry(true); }
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
        onClick={joinButtonPressed}
      >
        {showEntry ? 'Enter Lobby' : 'Join'}
      </Button>
      <br />
      {showEntry
        ? (
          <TextField
            id="standard-basic"
            label="Paste Lobby Code"
            InputLabelProps={{ style: { color: '#999' } }}
            InputProps={{ style: { color: '#99e', width: '20vw' } }}
            style={{ marginTop: '2vh' }}
            onChange={(e) => setUserEntry(e.target.value)}
            value={userEntry}
          />
        )
        : null}
    </Container>
  );
}


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
