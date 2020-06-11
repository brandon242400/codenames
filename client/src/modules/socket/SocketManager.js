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


  getServerGameState() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.emit('getGameState', this.data, (data) => {
        resolve(data);
      });
    });
  }


  sendChangeInGameState(currentGame, card = null) {
    const data = this.getDataCopy({
      wordList: currentGame.wordList,
      teamsTurn: currentGame.teamsTurn,
      spymastersHint: currentGame.spymastersHint,
      scores: currentGame.scores,
    });
    data.changes = { card };
    this.socket.emit('changeInGameState', data);
  }


  onChangeInGameState(callback) {
    this.socket.on('changeInGameStateBroadcast', (data) => {
      callback(data);
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
