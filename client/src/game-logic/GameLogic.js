import nounList from "../Nouns";

/**
 * Takes input from the game and gives results based on the rules of the game.
 */
export default class GameLogic {
  constructor() {
    this.wordList = this.generateWordList();
    this.blueTeamsSelectedCards = [];
    this.redTeamsSelectedCards = [];
  }

  /**
   * Generates list of words to be used in game as objects including which team they're for.
   */
  generateWordList() {
    let list = [],
      wordList = [],
      word,
      team;

    // Generating the list of words to use for the game.
    for (let x = 0; x < 25; x++) {
      do {
        word = nounList[Math.round(Math.random() * (nounList.length - 1))];
      } while (list.includes(word));

      list.push(word);

      if (x === 0) team = "blue";
      if (x === 8) team = "red";
      if (x === 16) team = "bystander";
      if (x === 24) team = "assassin";

      wordList.push({
        word: word,
        team: team,
        selected: false,
      });
    }

    // Randomizing the order of the list.
    let result = [],
      listItem,
      randNum;
    for (let x = 0; x < 25; x++) {
      randNum = Math.round(Math.random() * (wordList.length - 1));
      listItem = wordList.splice(randNum, 1)[0];
      randNum = Math.round(Math.random() * wordList.length);
      if (randNum === result.length) randNum--;
      result.splice(randNum, 0, listItem);
    }

    return result;
  }

  /**
   * Given the card: {word: "", team: ""} and team guessing, attributes a point to whichever
   * team's card was chosen or attributes the "assassin" card to whichever team chose it.
   * @param {Object} card that was selected
   * @param {String} team that selected the card
   * @returns {Boolean} true if choice was valid and player can guess again or false if invalid.
   */
  guessCard(card, team) {
    let word = card.word,
      index = -1;
    for (let x = 0; x < this.wordList.length; x++) {
      if (this.wordList[x].word === word) {
        index = x;
        break;
      }
    }

    this.wordList[index].selected = true;
    let listItem = JSON.parse(JSON.stringify(this.wordList[index]));

    // Checking which team's card got guessed and returning true if the player can guess again.
    if (listItem.team === "blue") {
      this.blueTeamsSelectedCards.push(listItem);
      if (team === "blue") return true;
    } else if (listItem.team === "red") {
      this.redTeamsSelectedCards.push(listItem);
      if (team === "red") return true;
    } else if (listItem.team === "assassin") {
      if (team === "blue") this.blueTeamsSelectedCards.push(card);
      else this.redTeamsSelectedCards.push(card);
    }

    return false;
  }

  getWordList() {
    return this.wordList;
  }

  getBlueScore() {
    return this.blueTeamsSelectedCards.length;
  }

  getRedScore() {
    return this.redTeamsSelectedCards.length;
  }
}
