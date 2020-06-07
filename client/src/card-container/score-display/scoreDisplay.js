import React from 'react';
import PropTypes from 'prop-types';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {
        redScore: 0,
        blueScore: 0,
      },
    };
    this.scoreChangeListener = this.scoreChangeListener.bind(this);
  }

  // Setting listener to retrieve scores from the server when there is a change.
  componentDidMount() {
    const { scores } = this.props;
    if (scores) {
      this.setState(() => ({ scores }));
    }
    this.scoreChangeListener();
  }

  /** Listens for score change emit from server and updates display */
  scoreChangeListener() {
    const { socketManager } = this.props;
    socketManager.getSocket().on('scoreChangeBroadcast', (scores) => {
      this.setState({ scores });
    });
  }

  render() {
    const { scores } = this.state;

    return (
      <>
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
        >
          <h3>{`Red: ${scores.redScore}`}</h3>
          <h3>{`Blue: ${scores.blueScore}`}</h3>
        </div>
      </>
    );
  }
}

scoreDisplay.propTypes = {
  scores: PropTypes.object,
  socketManager: PropTypes.object.isRequired,
};

scoreDisplay.defaultProps = {
  scores: {
    redScore: 0,
    blueScore: 0,
  },
};
