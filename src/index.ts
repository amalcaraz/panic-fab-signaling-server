import * as socketIO from 'socket.io';
import { ClientData, ClientDataStore, ClientLoginData } from './client-data.model';

const io: SocketIO.Server = socketIO(3000);
const signAlignSockets = io.of('/signaling');

console.log('running server...');


export interface IICECandidateOutgoingEvent {
  from: ClientData;
  candidate: RTCIceCandidate;
}

export interface IICECandidateIncomingEvent {
  to: ClientData;
  candidate: RTCIceCandidate;
}

export interface ISessionDescriptionOutgoingEvent {
  from: ClientData;
  description: RTCSessionDescription;
}

export interface ISessionDescriptionIncomingEvent {
  to: ClientData;
  description: RTCSessionDescription;
}


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

    socket.on('ice-candidate', (iceEvent: IICECandidateIncomingEvent) => {

      const fromPeer: ClientData | undefined = clientDataStore.get(socket.id);

      if (fromPeer) {

        const message: IICECandidateOutgoingEvent = {
          from: fromPeer,
          candidate: iceEvent.candidate
        };

        signAlignSockets.connected[iceEvent.to.socketId].emit('ice-candidate', message);

      }

    });

    socket.on('sdp', (sdpEvent: ISessionDescriptionIncomingEvent) => {

      const fromPeer: ClientData | undefined = clientDataStore.get(socket.id);

      if (fromPeer) {

        const message: ISessionDescriptionOutgoingEvent = {
          from: fromPeer,
          description: sdpEvent.description
        };

        signAlignSockets.connected[sdpEvent.to.socketId].emit('sdp', message);

      }

    });

    socket.on('disconnect', function () {

      signAlignSockets.emit('peer-disconnected', clientDataStore.get(socket.id));
      clientDataStore.remove(socket.id);

    });
  });