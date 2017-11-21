import * as socketIO from 'socket.io';
import { ClientData, ClientDataStore, ClientLoginData } from './client-data.model';

const io: SocketIO.Server = socketIO(3000);
const signAlignSockets = io.of('/signaling');

console.log('running server...');

const clientDataStore = new ClientDataStore();

signAlignSockets
    .on('connection', (socket: SocketIO.Socket) => {

        socket.on('login', (loginData: ClientLoginData) => {

            clientDataStore.set(
                socket.id,
                new ClientData(socket.id, loginData.alias, [])
            );

            signAlignSockets.emit('new-peer', clientDataStore.get(socket.id));
            socket.emit('peer-list', clientDataStore.getClientsDataListFromSocketMap(signAlignSockets.sockets));

        });

        socket.on('ice-candidate', function (from, msg) {
            console.log('I received an ice candidate message by ', from, ' saying ', msg);
        });

        socket.on('sdp', function (from, msg) {
            console.log('I received a sdp message by ', from, ' saying ', msg);
        });

        socket.on('disconnect', function () {

            socket.on('login', (loginData: ClientLoginData) => {

                clientDataStore.set(
                    socket.id,
                    new ClientData(socket.id, loginData.alias, [])
                );

            });

            signAlignSockets.emit('peer-disconnected');

        });
    });