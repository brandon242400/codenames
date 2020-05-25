import io from 'socket.io-client';

/** Creates socket to communicate with server and has methods to set listeners and get data. */
export default class SocketManager {
  constructor(gameID) {
    this.socket = io();
    this.data = {
      gameID,
      socketID: this.socket.id,
    };
    this.sendGameID(gameID);
  }


  /** Sends gameID to server to set up game instance and link client socket to game. */
  sendGameID() { this.socket.emit('sendGameID', this.data.gameID); }


  /** Gets cards/wordList from server and returns through a callback function.
   *  @param {function} callbackFunction Function that will be recieving the list. */
  getCards() {
    // this.socket.emit('sendCards', this.data, callbackFunction);

    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.emit('sendCards', this.data, (cards) => {
        resolve(cards);
      });
    });
  }


  testListener() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Missing socket connection'));
      }
      this.socket.on('testingStuff', (data) => {
        resolve(data);
      });
    });
  }


  /** Returns the socket affiliated with this socket manager instance */
  getSocket() { return this.socket; }
}
