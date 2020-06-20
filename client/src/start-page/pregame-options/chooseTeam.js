import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../../buttons/styles/styledButton';
import colors from '../../constants/colors';

export default function chooseTeam(props) {
  const { setPlayersTeam } = props;

  return (
    <>
      <StyledTitle>Choose Your Team</StyledTitle>
      <Container>
        {/* <ButtonContainer style={{ marginRight: '10vw' }}> */}
        <ButtonContainer>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('red', 'Red')}
            style={{ marginBottom: '3vh' }}
          >
            Red Team
          </StyledButton>
          <br />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('spyRed', 'Red Team\'s Spy')}
          >
            Red Team&apos;s Spy
          </StyledButton>
        </ButtonContainer>

        <ButtonContainer>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('blue', 'Blue')}
            style={{ marginBottom: '3vh' }}
          >
            Blue Team
          </StyledButton>
          <br />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => setPlayersTeam('spyBlue', 'Blue Team\'s Spy')}
          >
            Blue Team&apos;s Spy
          </StyledButton>
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
  border: 1px solid black;
`;

const StyledTitle = styled.h2`
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
  color: ${colors.primary};
  font-size: 175%;
  width: fit-content;
  margin: auto;
  margin-top: 5vh;
  text-decoration: underline;
`;
