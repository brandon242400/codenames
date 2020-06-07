const socketDict = require('./global').socketDict;
const gameObj = require('../game-dependencies/Game');

class SocketManager {
  constructor(socket) {
    // socketDict = socketDict;
    this.socket = socket;
    this.establishSocketConnection();
  }

  establishSocketConnection() {
    this.socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Initial game setup and socket storage. 
    this.setSendGameIDListener();
    
    // Send Card listener
    this.setSendCardsListener();

    this.setSendChangeInGameStateListener();

    this.setSendGameState();
  }


  setSendChangeInGameStateListener() {
    this.socket.on('changeInGameState', (data) => {
      const { gameID } = data;
      const game = socketDict[gameID].game;
      data = game.getChangesInData(data);
      game.updateData(data);
      this.emitChangeInGameState(data);
    });
  }
  

  emitChangeInGameState(data) {
    const { gameID, playerID } = data;
    const sockets = socketDict[gameID].connectedSockets;
    data.gameID = null;
    data.playerID = null;
    for (let ID of Object.keys(sockets)) {
      sockets[ID].emit('changeInGameStateBroadcast', data);
      if (ID !== playerID) {
        sockets[ID].emit(`${data.changes.card.word}CardChanged`, data.changes.card);
      }
    }
  }


  setSendGameState() {
    this.socket.on('getGameState', (data, callback) => {
      const { gameID } = data;
      callback(socketDict[gameID].game.getData());
    });
  }


  /** Creates a game session or joins one depending on if one exists or not. */
  setSendGameIDListener() {
    this.socket.on('sendGameID', (data) => {
      const { gameID, playerID } = data;

      if (!this.isValidGameID(gameID)) {
        socketDict[gameID] = {
          game: new gameObj.Game(),
          connectedSockets: {
            [playerID]: this.socket,
          },
        };
      } else {
        socketDict[gameID].connectedSockets[playerID] = this.socket;
      }
    });
  }


  /** Sets the listener that sends the cards/wordList to the client to render. */
  setSendCardsListener() {
    this.socket.on('sendCards', (data, callback) => {
      const { gameID } = data;
      if (this.isValidGameID(gameID))
        callback(socketDict[gameID].game.wordList);
      else
        callback(null);
    });
  }


  isValidGameID(gameID) {
    return Object.prototype.hasOwnProperty.call(socketDict, gameID);
  }

  getSocket() {
    return this.socket;
  }

  getSocketDictionary() {
    return socketDict;
  }
}

module.exports = { SocketManager };

/*

socketDict format : {
  uuid/gameID: {
    game: new gameObj.Game(),
    connectedSockets: {
      playerID: {
        socket: socket,
      },
      playerID2: socket,
      ...
    }
  }
}

*/
