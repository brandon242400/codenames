/**
 * Takes input from the game and gives results based on the rules of the game.
 */
export default class GameLogic {
  constructor(gameID) {
    this.wordList = null;
    this.gameID = gameID;
    this.teamsTurn = 'spyRed';
    this.spymastersHint = {
      hint: null,
      team: null,
      guesses: 0,
    };
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
    this.spymastersHint.hint = hint;
    this.spymastersHint.team = team;
    this.spymastersHint.guesses = guessCount;
    this.setWhosTurnItIs(this.spymastersHint);
  }


  /**
   * Given the card: {word: "", team: ""} and team guessing, attributes a point
   * to whichever team's card was chosen.
   * @param {Object} card that was selected
   * @param {String} teamThatGuessed the card
   * @returns {Boolean} true if choice was valid and player can guess again or false if invalid
   */
  guessCard(card, teamThatGuessed) {
    this.spymastersHint.guesses -= 1;

    // Checking which team's card got guessed and updating score
    if (card.team === 'blue') {
      this.scores.blueScore += 1;
      if (this.spymastersHint.guesses < 1 || teamThatGuessed === 'red') {
        this.setSpymastersHint('', '', 0);
      }
    } else if (card.team === 'red') {
      this.scores.redScore += 1;
      if (this.spymastersHint.guesses < 1 || teamThatGuessed === 'blue') {
        this.setSpymastersHint('', '', 0);
      }
    }
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


  /**
   * Sets all GameLogic data to match another game session's state
   * @param {*} data Game info of the session being joined
   */
  setAllGameSessionData(data) {
    const {
      wordList,
      teamsTurn,
      spymastersHint,
      scores,
    } = data;
    if (this.wordList) {
      this.updateWordList(data);
    } else {
      this.wordList = wordList;
    }
    if (spymastersHint) {
      this.spymastersHint.hint = spymastersHint.hint;
      this.spymastersHint.team = spymastersHint.team;
      this.spymastersHint.guesses = spymastersHint.guesses;
    }
    this.teamsTurn = teamsTurn;
    this.scores = scores;
  }


  /**
   * Updates this.wordList without reassigning it so it holds the same object reference.
   * @param {*} data
   */
  updateWordList(data) {
    if (data.changes) {
      if (!data.changes.card) {
        return;
      }
    } else { return; }

    const { changes } = data;
    const { card } = changes;
    for (let x = 0; x < this.wordList.length; x += 1) {
      if (card.word === this.wordList[x].word) {
        this.wordList[x].selected = card.selected;
        this.wordList[x].teamThatGuessed = card.teamThatGuessed;
        break;
      }
    }
  }
}
