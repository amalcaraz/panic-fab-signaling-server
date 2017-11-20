import * as socketIO from 'socket.io';

const io: SocketIO.Server = socketIO(3000);

console.log('running server...');

io.on('connection', function (socket) {

  io.emit('this', { will: 'be received by everyone'});

  socket.on('my other event', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});