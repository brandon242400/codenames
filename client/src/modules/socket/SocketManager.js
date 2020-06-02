import io from 'socket.io-client';

/** Creates socket to communicate with server and has methods to set listeners and get data. */
export default class SocketManager {
  constructor(gameID, playerID, playersTeam) {
    this.socket = io();
    this.data = {
      gameID,
      playerID,
      playersTeam,
    };
    this.sendGameID();
  }


  /** Sends gameID to server to start a new game.
   *  If joining a game, waits for data from the game session to be returned. */
  sendGameID() {
    this.socket.emit('sendGameID', this.data);
  }


  /** Gets cards/wordList from server and returns through a callback function. */
  getCards() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.emit('sendCards', this.data, (cards) => {
        resolve(cards);
      });
    });
  }


  sendChangeInGameState(currentGame) {
    const data = this.getDataCopy({
      wordList: currentGame.wordList,
      teamsTurn: currentGame.teamsTurn,
      spymastersHint: currentGame.spymastersHint,
      scores: currentGame.scores,
    });
    this.socket.emit('changeInGameState', data);
  }


  changeInGameStateListener() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.on('changeInGameStateBroadcast', (data) => {
        resolve(data);
      });
    });
  }


  /** Listens to and returns changes to the game score from the server */
  scoreChangeListener() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.on('scoreChange', (data) => {
        resolve(data);
      });
    });
  }


  /** Sends the users choice to the server to broadcast it to other players */
  sendSelectedCard(card, currentGame) {
    const data = this.getDataCopy({
      card,
      teamsTurn: currentGame.teamsTurn,
      scores: currentGame.scores,
      spymastersHint: currentGame.spymastersHint,
    });

    if (card.team === 'assassin') {
      this.socket.emit('assassinCardSelected', data);
    } else {
      this.socket.emit('cardSelected', data);
      console.log('emitting event');
    }
  }


  /** Listens for other players moves & returns the card they selected */
  cardSelectedListener() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      console.log('cardSelectedListener set');
      this.socket.on('cardSelectedBroadcast', (card) => {
        console.log('cardSelectedListener()');
        resolve(card);
      });
    });
  }


  /** Returns a promise for the current game session data the user is trying to join */
  getGameSessionData() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.emit('getAllSessionData', this.data, (data) => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Could not find game session. Invalid game ID'));
        }
      });
    });
  }


  /** Copys this.data and adds properties from the passed argument to it then returns it
   *  @param {object} data The object being added to this.data */
  getDataCopy(data) {
    const result = { ...this.data };
    Object.keys(data).forEach((key) => {
      result[key] = data[key];
    });
    return result;
  }


  /** Returns the socket affiliated with this socket manager instance */
  getSocket() { return this.socket; }
}
