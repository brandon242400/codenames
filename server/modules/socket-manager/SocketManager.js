const gameObj = require('../game-dependencies/Game');

class SocketManager {
  constructor(socket) {
    this.socketDict = {};
    this.socket = socket;
    this.establishSocketConnection();
  }

  establishSocketConnection() {
    const socket = this.socket;
    const socketDict = this.socketDict;

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    /*
    * Initial game setup and socket storage. 
    */
    socket.on('sendGameID', (gameID) => {
      if (!this.isValidGameID(gameID)) {
        socketDict[gameID] = {
          game: new gameObj.Game(),
          connectedSockets: [socket],
        };
      } else {
        socketDict[gameID].connectedSockets.push(socket);
      }
    });
    
    /*
    * Sends cards
    */
    socket.on('sendCards', (data, callback) => {
      const { gameID } = data;
      if (this.isValidGameID(gameID))
        callback(socketDict[gameID].game.wordList);
      else
        callback(null);
    });

    /*
    * Verifies the entered gameID is valid. 
    */
    socket.on('validateGameID', (gameID, callback) => {
      callback(this.isValidGameID(gameID));
    });

    this.setCardSelectedListener();
  }

  /** Called whenever a player picks a card in game. 
   *  Updates server version of wordList and emits the move to the other clients in game. */
  setCardSelectedListener() {
    const socket = this.socket;
    const socketDict = this.socketDict;

    socket.on('cardSelected', (data) => {
      const { gameID, card, teamsTurn, teamThatGuessed, spymastersHint } = data;
      const game = socketDict[gameID].game;
      const sockets = socketDict[gameID].connectedSockets;

      card.teamThatGuessed = teamThatGuessed;
      game.replaceCard(card);
      game.teamsTurn = teamsTurn;
      game.spymastersHint = spymastersHint;

      for (let sock of sockets) {
        if (sock.id !== socket.id) {
          sock.emit('cardSelectedBroadcast', card);
        }
      }
    });
  }

  isValidGameID(gameID) {
    return Object.prototype.hasOwnProperty.call(this.socketDict, gameID);
  }

  getSocket() {
    return this.socket;
  }

  getSocketDictionary() {
    return this.socketDict;
  }
}

module.exports = { SocketManager };

// socketDict format : {
//  uuid/gameID: {
//    game: new gameObj.Game(),
//    connectedSockets: [socket1, socket2, ...],
//  }
// }
