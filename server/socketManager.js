const gameObj = require('./game-dependencies/Game');

function establishSocketConnection(socket, socketDict) {
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  /*
  * Initial game setup and socket storage. 
  */
  socket.on('sendGameID', (gameID) => {
    if (!socketDict[gameID]) {
      socketDict[gameID] = {
        game: new gameObj.Game(),
        connectedSockets: [socket],
      };
    } else {
      socketDict[gameID].connectedSockets.push(socket);
    }
    socket.emit('cards', socketDict[gameID].game.wordList);
  });

  /*
  * Verifies the entered gameID is valid. 
  */
  socket.on('validateGameID', (gameID) => {
    const IDlist = Object.keys(socketDict);
    const validID = IDlist.includes(gameID);
    socket.emit('gameIDvalidated', validID);
  });

  /*
  * Called whenever a player picks a card in game. 
  */
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

module.exports = { establishSocketConnection };