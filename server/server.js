const express = require('express');
const bodyParser = require('body-parser');
const gameObj = require('./game-dependencies/Game');


const PORT = process.env.NODE_ENV || 5000;
// const game = new gameObj.Game();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


io.on('connection', (socket) => {
  console.log('Client connected to server socket.');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// POST
app.post('/api/moves', (req, res) => {
  console.log('POST: ' + req.body.move);
  res.send('POST sent');
});



server.listen(PORT);