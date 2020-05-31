const gameObj = require('../game-dependencies/Game');

class SocketManager {
  constructor(socket) {
    this.socketDict = {};
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

    // Verifies the entered gameID is valid. 
    this.socket.on('validateGameID', (gameID, callback) => {
      callback(this.isValidGameID(gameID));
    });

    // Called when a player makes a move in game.
    this.setCardSelectedListener();

    // Test Listener
    this.socket.on('testEmit', (msg, callback) => {
      console.log(msg);
      callback('Server Response');
    })
  }

  /** Creates a game session or joins one depending on if one exists or not. */
  setSendGameIDListener() {
    this.socket.on('sendGameID', (gameID) => {
      if (!this.isValidGameID(gameID)) {
        this.socketDict[gameID] = {
          game: new gameObj.Game(),
          connectedSockets: [this.socket],
        };
      } else {
        this.socketDict[gameID].connectedSockets.push(this.socket);
      }
    });
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

  /** Sets the listener that sends the cards/wordList to the client to render. */
  setSendCardsListener() {
    this.socket.on('sendCards', (data, callback) => {
      const { gameID } = data;
      if (this.isValidGameID(gameID))
        callback(this.socketDict[gameID].game.wordList);
      else
        callback(null);
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
