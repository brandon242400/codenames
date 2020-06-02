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

    // Verifies the entered gameID is valid. 
    this.socket.on('validateGameID', (gameID, callback) => {
      callback(this.isValidGameID(gameID));
    });

    // Called when a player makes a move in game.
    this.setCardSelectedListener();

    // Called when a player selects the assassin card and ends the game.
    this.setAssassinCardSelectedListener();

    this.setSendAllSessionDataListener();
  }


  /** Updates the score and emits it to other players */
  checkGameScore(data) {
    const { gameID, playerID, scores } = data;
    const game = socketDict[gameID].game;
    if (
      game.scores.redScore === scores.redScore
      && game.scores.blueScore === scores.blueScore
    ) { return; }

    game.scores = scores
    const sockets = socketDict[gameID].connectedSockets;
    for (let ID of Object.keys(sockets)) {
      sockets[ID].emit('scoreChange', scores);
    }
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


  /** Called whenever a player picks a card in game. 
   *  Updates server version of wordList and emits the move to the other clients in game. */
  setCardSelectedListener() {
    this.socket.on('cardSelected', (data) => {
      const { gameID, card, teamsTurn, spymastersHint, playerID } = data;
      const game = socketDict[gameID].game;
      const sockets = socketDict[gameID].connectedSockets;

      game.replaceCard(card);
      game.teamsTurn = teamsTurn;
      game.spymastersHint = spymastersHint;

      this.checkGameScore(data);

      for (let ID of Object.keys(sockets)) {
        if (ID !== playerID) {
          sockets[ID].emit('cardSelectedBroadcast', { card, teamsTurn, spymastersHint });
        }
      }
    });
  }



  setAssassinCardSelectedListener() {
    this.socket.on('assassinCardSelected', (data) => {
      const { gameID, card } = data;
      const socketList = socketDict[gameID].connectedSockets;
      for (let sock of socketList) {
        sock.emit('assassinCardSelectedBroadcast', card);
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

  /** Listener to send all game info to a player joining a game after it has already started */
  setSendAllSessionDataListener() {
    this.socket.on('getAllSessionData', (data, callback) => {
      console.log()
      const { gameID } = data;
      if (!this.isValidGameID(gameID)) {
        callback(null);
      } else {
        const game = socketDict[gameID].game;
        callback({
          wordList: game.wordList,
          teamsTurn: game.teamsTurn,
          spymastersHint: game.spymastersHint,
          scores: game.scores,
        });
      }
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
