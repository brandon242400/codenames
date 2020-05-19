import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class SpymasterEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      numInput: '',
      currentGame: props.currentGame,
    };
    this.playersTeam = props.playersTeam;
    this.setHint = this.setHint.bind(this);
  }

  setHint() {
    const { textInput, numInput, currentGame } = this.state;
    if (currentGame.teamsTurn === this.playersTeam) {
      currentGame.setSpymastersHint(textInput, this.playersTeam, parseInt(numInput, 10));
      this.setState({
        textInput: '',
        numInput: '',
      });
    } else {
      this.setState({
        textInput: 'It\'s not your turn',
        numInput: '',
      });
    }
  }

  render() {
    const { textInput, numInput, currentGame } = this.state;
    console.log(currentGame.teamsTurn);

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
  // eslint-disable-next-line
  currentGame: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
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
