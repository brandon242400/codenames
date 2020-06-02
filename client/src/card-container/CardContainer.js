import React from 'react';
import PropTypes from 'prop-types';
import Card from './card/Card';
import ScoreDisplay from './score-display/scoreDisplay';
import AssassinCard from '../end-game/assassinCardSelected';
import SpymasterEntry from '../spymaster-entry/spymasterEntry';
import StyledCardContainer from './cardContainerStyles';


export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAssassinCard: false,
      wordList: null,
    };
    const { currentGame, socketManager, playersTeam } = this.props;
    this.playersTeam = playersTeam;
    this.socketManager = socketManager;
    this.currentGame = currentGame;
    // this.createCards = this.createCards.bind(this);
    this.setAssassinCard = this.setAssassinCard.bind(this);
    this.cardSelectedListener = this.cardSelectedListener.bind(this);
  }


  /** Repeatedly checks for wordList to be set if it isn't already */
  componentDidMount() {
    if (!this.currentGame.wordList) {
      const intervalID = setInterval(() => {
        if (this.currentGame.wordList) {
          clearInterval(intervalID);
          this.setState({ wordList: this.currentGame.wordList });
        }
      }, 250);
    } else {
      this.setState({ wordList: this.currentGame.wordList });
    }
    this.cardSelectedListener();
  }


  /** Sets the 'selectedAssassinCard' value when someone selects the card.
   *  @param {Boolean} val */
  setAssassinCard(val = true) {
    this.setState({ selectedAssassinCard: val });
  }


  cardSelectedListener() {
    this.socketManager.cardSelectedListener()
      .then((res) => {
        console.log(res);
        const { card } = res;
        const list = this.currentGame.wordList;
        console.log(card);

        for (let x = 0; x < list.length; x += 1) {
          if (list[x].word === card.word) {
            list[x] = card;
            this.setState({ wordList: list });
            break;
          }
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  }


  /** Generates and returns a list of cards from the wordList array given from the server. */
  // createCards() {
  //   return this.currentGame.wordList.map((word) => (
  //     <Card
  //       key={word.word}
  //       currentGame={this.currentGame}
  //       playersTeam={this.playersTeam}
  //       setAssassinCard={this.setAssassinCard}
  //       socketManager={this.socketManager}
  //       wordObj={word}
  //     />
  //   ));
  // }


  render() {
    const { selectedAssassinCard, wordList } = this.state;

    return (
      <div>
        <ScoreDisplay socketManager={this.socketManager} />
        {(this.playersTeam === 'spyRed' || this.playersTeam === 'spyBlue')
          ? <SpymasterEntry currentGame={this.currentGame} playersTeam={this.playersTeam} />
          : null}
        <StyledCardContainer>
          {wordList ? wordList.map((word) => (
            <Card
              key={word.word}
              wordObj={word}
              currentGame={this.currentGame}
              playersTeam={this.playersTeam}
              setAssassinCard={this.setAssassinCard}
              socketManager={this.socketManager}
            />
          )) : null}
          {selectedAssassinCard
            ? (
              <AssassinCard
                losingTeam={this.playersTeam}
                startNewGame={() => null} /* <-- Need to add a way for a player to
                start a new game within the same gameID /uuid instance. */
              />
            )
            : null}
        </StyledCardContainer>
      </div>
    );
  }
}

CardContainer.propTypes = {
  currentGame: PropTypes.object.isRequired,
  socketManager: PropTypes.object.isRequired,
  playersTeam: PropTypes.string.isRequired,
};
