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

// let socketDict = {
//   uuid: [
//     socket1,
//     socket2,
//   ]
// }


// temp
let $gameID;

// Socket stuff
io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('send gameID', (gameID) => {
    console.log(gameID);
    $gameID = gameID;
    
    socket.emit(
      `${$gameID}: cards`,
      game.wordList
    );
  });

});


// POST
app.post('/api/moves', (req, res) => {
  console.log('POST: ' + req.body.move);
  res.send('POST sent');
});



server.listen(PORT);