'use strict';


const {Server} = require('socket.io');
// const clientIo = require('socket.io-client');//frontend
const server = new Server(3000, {cors:{origin:['http://localhost:3001'], methods:['GET']}});

const chat = server.of('/chat');

chat.on('connection', (socket) => {
  socket.emit('connections');
  console.log('socket is connected', socket.id);

  socket.on('joinRoom', (data) => {
    console.log('EVENT:joined', data);
    chat.emit('joinedRoom', data.username + 'has joined the chatroom');
  });

  socket.on('chat', (message) => {
    console.log('EVENT:chat', message);
    chat.emit('chat', message);
  });

  socket.on('disconnect', (id) => {
    console.log('EVENT:disconnect', id);
    chat.emit('Test', id + 'has left the chatroom');
  });

});

// clientIo.connect('http://localhost:3000/chat');// frontend

// server.listen(3000, () => {
//   console.log(`listening on *:${3000}`);
// });

// var app = require('express')();
// var http = require('http').createServer(app);
// const PORT = 8080;
// var io = require('socket.io')(http);
// var STATIC_CHANNELS = [{
//     name: 'Global chat',
//     participants: 0,
//     id: 1,
//     sockets: []
// }, {
//     name: 'Funny',
//     participants: 0,
//     id: 2,
//     sockets: []
// }];

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })


// http.listen(PORT, () => {
//     console.log(`listening on *:${PORT}`);
// });

// io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
//     console.log('new client connected');
//     socket.emit('connection', null);
//     socket.on('channel-join', id => {
//         console.log('channel join', id);
//         STATIC_CHANNELS.forEach(c => {
//             if (c.id === id) {
//                 if (c.sockets.indexOf(socket.id) == (-1)) {
//                     c.sockets.push(socket.id);
//                     c.participants++;
//                     io.emit('channel', c);
//                 }
//             } else {
//                 let index = c.sockets.indexOf(socket.id);
//                 if (index != (-1)) {
//                     c.sockets.splice(index, 1);
//                     c.participants--;
//                     io.emit('channel', c);
//                 }
//             }
//         });

//         return id;
//     });
//     socket.on('send-message', message => {
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         STATIC_CHANNELS.forEach(c => {
//             let index = c.sockets.indexOf(socket.id);
//             if (index != (-1)) {
//                 c.sockets.splice(index, 1);
//                 c.participants--;
//                 io.emit('channel', c);
//             }
//         });
//     });

// });



// /**
//  * @description This methos retirves the static channels
//  */
// app.get('/getChannels', (req, res) => {
//     res.json({
//         channels: STATIC_CHANNELS
//     })
// });
