const express = require('express');
const bodyParser = require('body-parser');
const gameObj = require('./game-dependencies/Game');


const PORT = process.env.NODE_ENV || 5000;
const game = new gameObj.Game();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// socketDict format : {
//  uuid: {
//    game: new gameObj.Game(),
//    connectedSockets: [socket1, socket2, ...],
//  }
// }
let socketDict = {};

// Socket stuff
io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Initial game setup and socket storage.
  socket.on('send_gameID', (gameID) => {
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

  // Verifies the entered gameID is valid.
  socket.on('validate_gameID', (gameID) => {

  });

  // Called whenever a player picks a card in game.
  socket.on('card_selected', (data) => {
    const { gameID, card, teamsTurn, teamThatGuessed, spymastersHint } = data;
    const game = socketDict[gameID].game;
    const sockets = socketDict[gameID].connectedSockets;

    card.teamThatGuessed = teamThatGuessed;
    game.replaceCard(card);
    game.teamsTurn = teamsTurn;
    game.spymastersHint = spymastersHint;

    for (let sock of sockets) {
      if (sock.id !== socket.id) {
        sock.emit('card_selected_server', card);
      }
    }
  });
});



// POST
app.post('/api/moves', (req, res) => {
  console.log('POST: ' + req.body.move);
  res.send('POST sent');
});



server.listen(PORT);