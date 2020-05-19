const generateWordList = require('./generateWordList').generateWordList;

class Game {
  constructor() {
    this.wordList = generateWordList();
  }
}

module.exports = { Game };