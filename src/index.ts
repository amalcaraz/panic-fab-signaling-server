import * as socketIO from 'socket.io';

const io: SocketIO.Server = socketIO(3000);

console.log('running server...');

io.on('connection', function (socket) {

    io.emit('this', {will: 'be received by everyone'});

    socket.on('ice-candidate', function (from, msg) {
        console.log('I received an ice candidate message by ', from, ' saying ', msg);
    });

    socket.on('sdp', function (from, msg) {
        console.log('I received a sdp message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});