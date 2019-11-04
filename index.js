var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
let rooms = 0;
io.on('connection', function (socket) {
  console.log('a user connected')

  // Create a new game room and notify the creator of game.
  socket.on('createGame', (data) => {
    console.log('createGame');
    socket.join(`${++rooms}`);
    socket.emit('newGame', { name: data.name, room: rooms });
  });

  // Connect the Player 2 to the room he requested. Show error if room full.
  socket.on('joinGame', function (data) {
    var room = io.nsps['/'].adapter.rooms[data.room];
    console.log(room)
    if (room && room.length === 1) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('player1', {});
      socket.emit('player2', { name: data.name, room: data.room })
    } else {
      socket.emit('err', { message: 'Sorry, The room is full!' });
    }
  });

  /**
     * Handle the turn played by either player and notify the other.
     */
  socket.on('playTurn', (data) => {
    socket.broadcast.to(data.room).emit('turnPlayed', {
      move: data.move,
      room: data.room
    });
  });

  socket.on('stillPlaying', (data) => {
    console.log('stillPlaying');
    socket.broadcast.to(data.room).emit('opponentPlaying', {
      move: data.move,
      room: data.room
    });
  });


  /**
     * Notify the players about the victor.
     */
  socket.on('gameEnded', (data) => {
    socket.broadcast.to(data.room).emit('gameEnd', data);
  });

  socket.on('disconnect', function (msg) {
    console.log('a user disconnect')
  });
});


http.listen(port, function () {
  console.log('listening on http://localhost:' + port);
});
