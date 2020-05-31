import React from 'react';
import PropTypes from 'prop-types';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redScore: 0,
      blueScore: 0,
    };
  }

  // Setting listener to retrieve scores from the server when there is a change.
  componentDidMount() {
    const { socketManager } = this.props;
    // Socket listeners to get score changes from server
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

scoreDisplay.propTypes = {
  socketManager: PropTypes.object.isRequired,
};
