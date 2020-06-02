import React from 'react';
import PropTypes from 'prop-types';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redScore: 0,
      blueScore: 0,
    };
    const { socketManager } = props;
    this.socketManager = socketManager;
    this.scoreChangeListener = this.scoreChangeListener.bind(this);
  }

  // Setting listener to retrieve scores from the server when there is a change.
  componentDidMount() {
    this.scoreChangeListener();
  }

  /** Listens for score change emit from server and updates display */
  scoreChangeListener() {
    this.socketManager.scoreChangeListener()
      .then((res) => {
        const { redScore, blueScore } = res;
        this.setState({ redScore, blueScore });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
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

scoreDisplay.propTypes = {
  socketManager: PropTypes.object.isRequired,
};
