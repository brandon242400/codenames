import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default function chooseTeam(props) {
  const { setPlayersTeam } = props;

  return (
    <>
      <StyledTitle>Choose Your Team</StyledTitle>
      <Container>
        <ButtonContainer style={{ marginRight: '10vw' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('red', 'Red')}
            style={{ marginBottom: '3vh' }}
          >
            Red Team
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('spyRed', 'Red Team\'s Spy')}
          >
            Red Team&apos;s Spy
          </Button>
        </ButtonContainer>

        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('blue', 'Blue')}
            style={{ marginBottom: '3vh' }}
          >
            Blue Team
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('spyBlue', 'Blue Team\'s Spy')}
          >
            Blue Team&apos;s Spy
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
}

chooseTeam.propTypes = {
  setPlayersTeam: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: fit-content;
  display: flex;
  margin: auto;
  margin-top: 20vh;
`;

const ButtonContainer = styled.div`
  display: block;
  width: fit-content;
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 175%;
  width: fit-content;
  margin: auto;
  margin-top: 5vh;
  text-decoration: underline;
`;
