import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

export default function ScoreLimitReached(props) {
  const [gameEnded, setGameEnded] = React.useState(false);
  const [resultingScores, setResultingScores] = React.useState();
  const { socketManager, playersTeam } = props;

  const getDisplayText = () => {
    const winningText = (wScore, lScore) => (
      <h3>
        {`Congratulations! You won with a score of ${wScore} to ${lScore}`}
      </h3>
    );
    const losingText = (wScore, lScore) => (
      <h3>
        {`The enemy team has won with ${wScore} points to your ${lScore}`}
      </h3>
    );

    try {
      if (playersTeam === 'red' || playersTeam === 'spyRed') {
        if (resultingScores.redScore === 8) {
          return winningText(resultingScores.redScore, resultingScores.blueScore);
        }
        return losingText(resultingScores.blueScore, resultingScores.redScore);
      } if (resultingScores.blueScore === 8) {
        return winningText(resultingScores.blueScore, resultingScores.redScore);
      }
      return losingText(resultingScores.redScore, resultingScores.blueScore);
    } catch (err) { return 'Test condition.'; }
  };

  socketManager.onScoreLimitReached((scores) => {
    setResultingScores(scores);
    setGameEnded(true);
  });

  return (
    gameEnded
      ? (
        <Container>
          <div className="game-end-text">
            <h3>
              {getDisplayText()}
            </h3>
          </div>
        </Container>
      )
      : null
  );
}

ScoreLimitReached.propTypes = {
  socketManager: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: absolute;
  text-align: center;
  top: 30vh;
  left: 5vw;
  width: 90vw;
  height: 30vh;
  background-color: rgba(100, 100, 100, .75);
  z-index: 1;

  h3 {
    font-size: 150%;
    font-weight: 600;
    font-family: 'Roboto Mono', monospace;
    background-color: ${colors.neutralLight};
    color: ${colors.primary};
    width: fit-content;
    margin: auto;
    margin-top: 10vh;
    opacity: 0.75;
  }
`;
