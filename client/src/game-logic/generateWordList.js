import nounList from './nouns';


/**
* Generates list of words to be used in game as objects including which team they're for.
* @returns {Object[]} word list as an array of objects
*/
const generateWordList = () => {
  const list = [];
  const wordList = [];
  let word;
  let team;

  // Generating the list of words to use for the game.
  for (let x = 0; x < 25; x += 1) {
    do {
      word = nounList[Math.round(Math.random() * (nounList.length - 1))];
    } while (list.includes(word));

    list.push(word);

    if (x === 0) team = 'blue';
    if (x === 8) team = 'red';
    if (x === 16) team = 'assassin';
    if (x === 17) team = 'bystander';

    wordList.push({
      word,
      team,
      selected: false,
    });
  }

  // Randomizing the order of the list.
  const result = [];
  let listItem;
  let randNum;
  for (let x = 0; x < 25; x += 1) {
    randNum = Math.round(Math.random() * (wordList.length - 1));
    [listItem] = wordList.splice(randNum, 1);
    randNum = Math.round(Math.random() * (wordList.length - 1));
    result.splice(randNum, 0, listItem);
  }

  return result;
};

export default generateWordList;
