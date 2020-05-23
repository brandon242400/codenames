const express = require('express');
const bodyParser = require('body-parser');
const socketManager = require('./modules/socket-manager/SocketManager');


const PORT = process.env.NODE_ENV || 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let sn;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Socket connection
io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  sn = new socketManager(socket);
});

// POST method to validate gameID before establishing socket connection
app.post('/api/validate-gameid', (req, res) => {
  res.json({ validID: sn.isValidGameID(req.body.gameID) });
});


server.listen(PORT);

// socketDict format : {
//  uuid/gameID: {
//    game: new gameObj.Game(),
//    connectedSockets: [socket1, socket2, ...],
//  }
// }