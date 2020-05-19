import React from 'react';
import PropTypes from 'prop-types';

export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redScore: 0,
      blueScore: 0,
    };
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    const { setScoreDisplayFunction } = this.props;
    setScoreDisplayFunction(this.updateScore);
  }

  updateScore(score) {
    this.setState({
      redScore: score.redScore,
      blueScore: score.blueScore,
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
        <h3>
          Red:
          {' '}
          {redScore}
        </h3>
        <h3>
          Blue:
          {' '}
          {blueScore}
        </h3>
      </div>
    );
  }
}

scoreDisplay.propTypes = {
  setScoreDisplayFunction: PropTypes.func.isRequired,
};
