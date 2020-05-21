import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AppContext from '../../context/AppContext';
import ScoreDisplay from './scoreDisplay';
import AssassinCard from '../game-end/assassinCardSelected';
import SpymasterEntry from '../spymaster-entry/spymasterEntry';
import { StyledCardContainer } from './styles/cardContainerStyles';


export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assassinCard: false,
      cards: null,
    };
    this.teamScores = {
      redScore: 0,
      blueScore: 0,
    };
    this.addTeamScore = this.addTeamScore.bind(this);
    this.createCards = this.createCards.bind(this);
    this.scoreDisplayFunction = null;
    this.setAssassinCard = this.setAssassinCard.bind(this);
    this.setScoreDisplayFunction = this.setScoreDisplayFunction.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      const { currentGame } = this.context;
      if (currentGame.wordList) {
        clearInterval(this.intervalID);
        this.setState({ cards: this.createCards() });
      }
    }, 250);
  }

  setAssassinCard(val = true) {
    this.setState({ assassinCard: val });
  }

  setScoreDisplayFunction(func) {
    this.scoreDisplayFunction = func;
    func({
      redScore: 0,
      blueScore: 0,
    });
  }

  createCards() {
    const { currentGame } = this.context;
    const { playersTeam } = this.props;

    const cards = currentGame.wordList.map((word) => (
      <Card
        key={word.word}
        currentGame={currentGame}
        playersTeam={playersTeam}
        plusBlueScore={() => this.addTeamScore('blue')}
        plusRedScore={() => this.addTeamScore('red')}
        setAssassinCard={this.setAssassinCard}
        wordObj={word}
      />
    ));
    return cards;
  }

  addTeamScore(team) {
    if (team === 'red') {
      this.teamScores.redScore += 1;
    } else {
      this.teamScores.blueScore += 1;
    }
    if (this.scoreDisplayFunction !== null) {
      this.scoreDisplayFunction(JSON.parse(JSON.stringify(this.teamScores)));
    } else {
      // eslint-disable-next-line
      console.log('No score display function set.');
    }
  }


  render() {
    const { assassinCard, cards } = this.state;
    const { playersTeam } = this.props;
    const { currentGame } = this.context;

    return (
      <div>

        <ScoreDisplay setScoreDisplayFunction={this.setScoreDisplayFunction} />

        {(playersTeam === 'spyRed' || playersTeam === 'spyBlue')
          ? <SpymasterEntry currentGame={currentGame} playersTeam={playersTeam} />
          : null}

        <StyledCardContainer>
          {cards}
          {assassinCard
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

CardContainer.propTypes = {
  playersTeam: PropTypes.string.isRequired,
};
