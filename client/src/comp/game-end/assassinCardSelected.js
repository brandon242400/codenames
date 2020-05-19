import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function assassinCardSelected(props) {
  const { losingTeam, startNewGame } = props;
  const winningTeam = (losingTeam === 'red') ? 'Blue' : 'Red';

  return (
    <Container>
      <h2>{`Assassin Card Selected by ${losingTeam} Team!`}</h2>
      <h2>{`${winningTeam} Team Wins!`}</h2>
      <button type="button" onClick={() => startNewGame()}>
        New Game?
      </button>
    </Container>
  );
}

assassinCardSelected.propTypes = {
  losingTeam: PropTypes.string.isRequired,
  startNewGame: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  text-align: center;

  h2 {
    color: #aaa;
    width: fit-content;
    margin: auto;
    margin-top: 25vh;
    margin-bottom: -15vh;
  }
`;
