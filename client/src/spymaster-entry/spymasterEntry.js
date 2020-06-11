import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class SpymasterEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      numInput: '',
    };
    this.setHint = this.setHint.bind(this);
    this.canEnterHint = this.canEnterHint.bind(this);
  }


  /** Sends this spymaster's hint to the server. */
  setHint() {
    const { textInput, numInput } = this.state;
    const { socketManager, playersTeam, currentGame } = this.props;

    if (!this.canEnterHint()) { return; }
    currentGame.setSpymastersHint(textInput.trim(), playersTeam, parseInt(numInput, 10));
    socketManager.sendChangeInGameState(currentGame);
    this.setState({
      textInput: '',
      numInput: '',
    });
  }


  /** Returns true if this spymaster can submit their hint. */
  canEnterHint() {
    const { textInput } = this.state;
    const { playersTeam, currentGame } = this.props;

    if (currentGame.teamsTurn !== playersTeam) {
      this.setState({
        textInput: 'It\'s not your turn',
        numInput: '',
      });
      return false;
    } if (textInput.trim().split(' ').length !== 1) {
      this.setState({
        textInput: 'Hint must be 1 word',
        numInput: '',
      });
      return false;
    } return true;
  }


  render() {
    const { textInput, numInput } = this.state;

    return (
      <Container>
        <input
          type="text"
          value={textInput}
          className="text-input"
          placeholder="Hint"
          onChange={(e) => this.setState({ textInput: e.target.value })}
        />
        <input
          type="number"
          value={numInput}
          className="num-input"
          placeholder="Guesses"
          onChange={(e) => this.setState({ numInput: e.target.value })}
        />
        <button
          type="button"
          onClick={this.setHint}
        >
          Enter
        </button>
      </Container>
    );
  }
}

SpymasterEntry.propTypes = {
  currentGame: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
  socketManager: PropTypes.object.isRequired,
};

const Container = styled.div`
background-color: #666;
border: 3px solid black;
border-radius: 5px;
display: flex;
justify-content: space-evenly;
margin: auto;
padding: 5px;
width: 50%;

.num-input {
  width: 20%;
}
`;
