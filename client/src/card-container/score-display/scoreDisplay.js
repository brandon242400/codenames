import React from 'react';
import PropTypes from 'prop-types';


export default class scoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: null,
    };
    this.scoreChangeListener = this.scoreChangeListener.bind(this);
  }

  // Setting listener to retrieve scores from the server when there is a change.
  componentDidMount() {
    const { scores } = this.props;
    this.setState({ scores });
    this.scoreChangeListener();
  }

  /** Listens for score change emit from server and updates display */
  scoreChangeListener() {
    const { socketManager } = this.props;
    socketManager.onChangeInGameState()
      .then((res) => {
        if (res.changes) {
          if (res.changes.scores) {
            console.log('Updating score');
            this.setState({ scores: res.changes.scores });
          }
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    const { scores } = this.state;

    return (
      <>
        {scores
          ? (
            <div style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
            >
              <h3>{`Red: ${scores.redScore}`}</h3>
              <h3>{`Blue: ${scores.blueScore}`}</h3>
            </div>
          )
          : null}
      </>
    );
  }
}

scoreDisplay.propTypes = {
  scores: PropTypes.object.isRequired,
  socketManager: PropTypes.object.isRequired,
};
