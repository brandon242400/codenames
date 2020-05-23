const express = require('express');
const bodyParser = require('body-parser');
const socketManager = require('./socketManager');


const PORT = process.env.NODE_ENV || 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Holds data for all ongoing games as well as connected sockets for each game
let socketDict = {};

// Socket connection
io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  socketManager.establishSocketConnection(socket, socketDict);
});

// POST method to validate gameID before establishing socket connection
app.post('/api/validate-gameid', (req, res) => {
  const gameID = req.body.gameID;
  const gameIDlist = Object.keys(socketDict);
  res.json({ validID: gameIDlist.includes(gameID) });
});


server.listen(PORT);

// socketDict format : {
//  uuid/gameID: {
//    game: new gameObj.Game(),
//    connectedSockets: [socket1, socket2, ...],
//  }
// }