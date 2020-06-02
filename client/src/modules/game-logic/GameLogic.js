/**
 * Takes input from the game and gives results based on the rules of the game.
 */
export default class GameLogic {
  constructor(gameID) {
    this.wordList = null;
    this.gameID = gameID;
    this.teamsTurn = 'spyRed';
    this.spymastersHint = {};
    this.setSpymastersHint('', '', 0);
    this.scores = {
      redScore: 0,
      blueScore: 0,
    };
  }


  /**
   * Sets the spymaster's hint.
   * @param {String} hint given from the spymaster
   * @param {String} team of the spymaster giving the hint
   * @param {Number} guessCount representing how many times the team gets to guess
   */
  setSpymastersHint(hint, team, guessCount) {
    const spyHint = {
      hint,
      team,
      guesses: guessCount,
    };
    this.spymastersHint = spyHint;
    this.setWhosTurnItIs(spyHint);
  }


  /**
   * Given the card: {word: "", team: ""} and team guessing, attributes a point to whichever
   * team's card was chosen or attributes the "assassin" card to whichever team chose it.
   * @param {Object} card that was selected
   * @param {String} teamThatGuessed the card
   * @returns {Boolean} true if choice was valid and player can guess again or false if invalid
   */
  guessCard(card, teamThatGuessed) {
    const { word } = card;
    let index = -1;
    for (let x = 0; x < this.wordList.length; x += 1) {
      if (this.wordList[x].word === word) {
        index = x;
        break;
      }
    }

    this.wordList[index].selected = true;
    const listItem = JSON.parse(JSON.stringify(this.wordList[index]));
    this.setSpymastersHint(
      this.spymastersHint.hint,
      this.spymastersHint.team,
      this.spymastersHint.guesses - 1,
    );

    // Checking which team's card got guessed and returning true if the player can guess again.
    if (listItem.team === 'blue') {
      this.scores.blueScore += 1;
      if (this.spymastersHint.guesses < 1) {
        this.setSpymastersHint('', '', 0);
        return false;
      }
      if (teamThatGuessed === 'blue') {
        return true;
      }
    } else if (listItem.team === 'red') {
      this.scores.redScore += 1;
      if (this.spymastersHint.guesses < 1) {
        this.setSpymastersHint('', '', 0);
        return false;
      }
      if (teamThatGuessed === 'red') return true;
    }

    this.setSpymastersHint('', '', 0);
    return false;
  }


  /**
   * Checks which team's turn it currently is and determines if it needs to
   * switch to a different team.
   */
  setWhosTurnItIs(hint = this.spymastersHint) {
    switch (this.teamsTurn) {
      case 'spyRed':
        if (hint.guesses > 0) { this.teamsTurn = 'red'; }
        break;
      case 'red':
        if (hint.guesses <= 0) { this.teamsTurn = 'spyBlue'; }
        break;
      case 'spyBlue':
        if (hint.guesses > 0) { this.teamsTurn = 'blue'; }
        break;
      case 'blue':
        if (hint.guesses <= 0) { this.teamsTurn = 'spyRed'; }
        break;
      default:
        // eslint-disable-next-line no-alert
        alert('Error in team turn assignment!');
        break;
    }
  }


  /** Sets all GameLogic data to match another game session's state
   *  @param {*} data Game info of the session being joined */
  setAllGameSessionData(data) {
    const {
      wordList,
      teamsTurn,
      spymastersHint,
      scores,
    } = data;
    this.wordList = wordList;
    this.teamsTurn = teamsTurn;
    this.spymastersHint = spymastersHint || { hint: '', team: '', guesses: 0 };
    this.scores = scores;
  }
}
