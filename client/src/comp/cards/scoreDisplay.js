import React from 'react';
import io from 'socket.io-client';
import AppContext from '../../context/AppContext';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redScore: 0,
      blueScore: 0,
    };
  }

  // Setting listener to retrieve the scores from the server when they change.
  componentDidMount() {
    this.socket = io();
    this.socket.on('sendGameScores', (data) => {
      this.setState({
        redScore: data.redScore,
        blueScore: data.blueScore,
      });
    });
  }

  render() {
    const { redScore, blueScore } = this.state;

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
}
scoreDisplay.contextType = AppContext;
