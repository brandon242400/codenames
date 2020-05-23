import React from 'react';
import Card from './Card';
import AppContext from '../../context/AppContext';
import ScoreDisplay from './scoreDisplay';
import AssassinCard from '../game-end/assassinCardSelected';
import SpymasterEntry from '../spymaster-entry/spymasterEntry';
import StyledCardContainer from './styles/cardContainerStyles';


export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAssassinCard: false,
      cards: null,
    };
    this.createCards = this.createCards.bind(this);
    this.setAssassinCard = this.setAssassinCard.bind(this);
  }


  /**
   * setInterval used to get wordList from this game session once the server sends it.
   * Cancels interval after it verifies wordList has been updated.
   */
  componentDidMount() {
    this.intervalID = setInterval(() => {
      const { currentGame } = this.context;
      if (currentGame.wordList) {
        clearInterval(this.intervalID);
        this.setState({ cards: this.createCards() });
      }
    }, 250);
  }


  /**
   * Sets the 'selectedAssassinCard' value that's used to decide whether or
   * not to show the end game component.
   * @param {Boolean} val
   */
  setAssassinCard(val = true) {
    this.setState({ selectedAssassinCard: val });
  }


  /**
   * Generates and returns a list of cards from the wordList array given from the server.
   */
  createCards() {
    const { currentGame, playersTeam, socket } = this.context;

    const cards = currentGame.wordList.map((word) => (
      <Card
        key={word.word}
        currentGame={currentGame}
        playersTeam={playersTeam}
        setAssassinCard={this.setAssassinCard}
        wordObj={word}
        socket={socket}
      />
    ));
    return cards;
  }


  render() {
    const { selectedAssassinCard, cards } = this.state;
    const { currentGame, socket, playersTeam } = this.context;

    return (
      <div>
        <ScoreDisplay socket={socket} />

        {(playersTeam === 'spyRed' || playersTeam === 'spyBlue')
          ? <SpymasterEntry currentGame={currentGame} playersTeam={playersTeam} />
          : null}

        <StyledCardContainer>
          {cards}
          {selectedAssassinCard
            ? (
              <AssassinCard
                losingTeam={playersTeam}
                startNewGame={() => null}
              />
            )
            : null}
        </StyledCardContainer>
      </div>
    );
  }
}
CardContainer.contextType = AppContext;
