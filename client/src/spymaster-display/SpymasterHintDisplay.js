import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default class SpymasterHintDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsTurn: '',
      spymastersHint: {
        hint: '',
        team: '',
        guesses: 0,
      },
    };
    this.getTeamsTurnDisplayText = this.getTeamsTurnDisplayText.bind(this);
  }

  componentDidMount() {
    const { socketManager, currentGame } = this.props;
    this.setState({
      teamsTurn: currentGame.teamsTurn,
      spymastersHint: currentGame.spymastersHint,
    });
    socketManager.onChangeInGameState((data) => {
      this.setState({ spymastersHint: data.changes.spymastersHint });
      if (data.changes.teamsTurn) {
        this.setState({ teamsTurn: data.changes.teamsTurn });
      }
    });
  }

  getTeamsTurnDisplayText() {
    const { teamsTurn } = this.state;
    switch (teamsTurn) {
      case 'red':
        return 'Red team\'s turn';
      case 'blue':
        return 'Blue team\'s turn';
      case 'spyRed':
        return 'Red Spymaster\'s turn';
      case 'spyBlue':
        return 'Blue Spymaster\'s turn';
      default:
        return 'Error getting team\'s turn.';
    }
  }

  render() {
    const { spymastersHint } = this.state;
    const { hint, guesses } = spymastersHint || { hint: null, guesses: 0 };

    return (
      <StyledContainer>
        <h4 className="team-turn">{`${this.getTeamsTurnDisplayText()}`}</h4>
        {guesses > 0
          ? (
            <>
              <h5>{`Hint:  ${hint}`}</h5>
              <h5>{`Guesses:  ${guesses}`}</h5>
            </>
          )
          : null}
      </StyledContainer>
    );
  }
}

SpymasterHintDisplay.propTypes = {
  socketManager: PropTypes.object.isRequired,
  currentGame: PropTypes.object.isRequired,
};

const StyledContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  margin: auto 0 auto auto;

  .team-turn {
    text-decoration: underline;
    margin: auto;
    width: fit-content;
  }
`;
