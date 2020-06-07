const generateWordList = require('./generateWordList').generateWordList;

class Game {
  constructor() {
    this.wordList = generateWordList();
    this.teamsTurn = 'spyRed';
    this.spymastersHint = null;
    this.scores = {
      redScore: 0,
      blueScore: 0,
    };
  }


  /**
   * Updates this class' properties to reflect the changes made from the client.
   * @param {Obj} data Game data to be updated
   */
  updateData(data) {
    const { wordList, teamsTurn, spymastersHint, scores, changes } = data;
    // this.wordList = wordList;
    this.teamsTurn = teamsTurn;
    this.spymastersHint = spymastersHint;
    this.scores = scores;

    for (let x = 0; x < wordList.length; x += 1) {
      if (wordList[x].word === changes.card.word) {
        wordList[x].selected = changes.card.selected;
        wordList[x].teamThatGuessed = changes.card.teamThatGuessed;
        this.wordList[x] = wordList[x];
        break;
      }
    }
  }


  getData() {
    return {
      wordList: this.wordList,
      teamsTurn: this.teamsTurn,
      spymastersHint: this.spymastersHint,
      scores: this.scores,
    };
  }


  /**
   * Compares the passed data to what this class has saved and adding
   * any differences to data.changes before returning it.
   * @param {object} data The data being checked for changes
   */
  getChangesInData(data) {
    const { scores, spymastersHint, teamsTurn } = data;
    data.changes.scores = null;
    data.changes.teamsTurn = null;
    data.changes.spymastersHint = spymastersHint;

    if (scores.redScore !== this.scores.redScore || scores.blueScore !== this.scores.blueScore) {
      data.changes.scores = scores;
    }
    if (teamsTurn !== this.teamsTurn) {
      data.changes.teamsTurn = teamsTurn;
    }

    return data;
  }
}

module.exports = { Game };