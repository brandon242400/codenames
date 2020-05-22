import React from 'react';
import PropTypes from 'prop-types';


export default function scoreDisplay(props) {
  const [redScore, setRedScore] = React.useState(0);
  const [blueScore, setBlueScore] = React.useState(0);
  const { socket } = props;

  // Setting listener to retrieve the scores from the server when they change.
  socket.on('getGameScore', (data) => {
    setRedScore(data.redScore);
    setBlueScore(data.blueScore);
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
    >
      <h3>{`Red: ${redScore}`}</h3>
      <h3>{`Blue: ${blueScore}`}</h3>
    </div>
  );
}


scoreDisplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.object.isRequired,
};
