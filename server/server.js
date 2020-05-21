const express = require('express');
const bodyParser = require('body-parser');
const gameObj = require('./game-dependencies/Game');
const socketManager = require('./socketManager');


const PORT = process.env.NODE_ENV || 5000;
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

// Socket connection
io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  socketManager.establishSocketConnection(socket, socketDict);
});



// POST
app.post('/api/validate-id', (req, res) => {
  console.log('POST: ' + req.body.move);
  res.send('POST sent');
});



server.listen(PORT);