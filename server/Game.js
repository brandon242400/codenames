const generateWordList = require('./game-dependencies/generateWordList').generateWordList;

class Game {
  constructor() {
    this.wordList = generateWordList();
  }
}

module.exports = { Game };