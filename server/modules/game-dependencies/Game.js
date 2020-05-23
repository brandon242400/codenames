const generateWordList = require('./generateWordList').generateWordList;

class Game {
  constructor() {
    this.wordList = generateWordList();
    this.teamsTurn = 'spyRed';
    this.spymastersHint = null;
    this.redScore = 0;
    this.blueScore = 0;
  }

  /**
   * Replaces the default card with the updated one.
   * @param {Obj} card 
   */
  replaceCard(card) {
    for (let x = 0; x < this.wordList.length; x++) {
      if (this.wordList[x].word === card.word) {
        this.wordList[x] = card;
        break;
      }
    }
  }
}

module.exports = { Game };