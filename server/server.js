const express = require('express');
const bodyParser = require('body-parser');
const gameObj = require('./Game');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
  console.log('connected to server socket.');
})

const game = new gameObj.Game();
const PORT = process.env.NODE_ENV || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST to add a move to the list
app.post('/api/moves', (req, res) => {
  console.log('POST: ' + req.body.move);
  res.send('POST sent');
});

// GET to get the move list to update client side
app.get('/api/moves', (req, res) => {
  console.log('GET player moves called.');
  res.send('Unused "moves" api call');
});

// Just here for testing...
app.get('/', (req, res) => {
  console.log('connected to root.');
  res.send('<h1>Home Page</h1>');
})


server.listen(PORT);