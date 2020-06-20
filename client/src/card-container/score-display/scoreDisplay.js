import React from 'react';
import PropTypes from 'prop-types';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {
        yourScore: 0,
        enemyScore: 0,
      },
    };
    this.scoreChangeListener = this.scoreChangeListener.bind(this);
    this.getModifiedScoreKeys = this.getModifiedScoreKeys.bind(this);
  }

  // Setting listener to retrieve scores from the server when there is a change.
  componentDidMount() {
    const { scores } = this.props;
    if (scores) {
      this.setState(() => ({ scores: this.getModifiedScoreKeys(scores) }));
    }
    this.scoreChangeListener();
  }

  /** Returns the scores value with different keys to match this component.
   * @param {Object} scores */
  getModifiedScoreKeys(scores) {
    const { playersTeam } = this.props;
    const result = {};
    if (playersTeam === 'red' || playersTeam === 'spyRed') {
      result.yourScore = scores.redScore;
      result.enemyScore = scores.blueScore;
    } else {
      result.yourScore = scores.blueScore;
      result.enemyScore = scores.redScore;
    } return result;
  }

  /** Listens for score change emit from server and updates display */
  scoreChangeListener() {
    const { socketManager } = this.props;
    socketManager.getSocket().on('scoreChangeBroadcast', (scores) => {
      this.setState({ scores: this.getModifiedScoreKeys(scores) });
    });
  }

  render() {
    const { scores } = this.state;

    return (
      <>
        <div>
          <h3>{`Your Score: ${scores.yourScore}`}</h3>
          <h3>{`Enemy Score: ${scores.enemyScore}`}</h3>
        </div>
      </>
    );
  }
}

scoreDisplay.propTypes = {
  scores: PropTypes.object,
  socketManager: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
};

scoreDisplay.defaultProps = {
  scores: {
    redScore: 0,
    blueScore: 0,
  },
};
