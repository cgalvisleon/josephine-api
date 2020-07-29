const socketIO = require('socket.io');
//const redis = require('socket.io-redis');
const socket = {};
const debug = require('debug')('app:websocket');
//const { config } = require('../config/index');

//const HOST = config.redisHost;
//const PORT = config.redisPort;

let connections = 0;

function SocketIO(server) {
  socket.io = socketIO(server);
  //socket.io.adapter(redis({ host: HOST, port: PORT }));

  socket.io.on('connection', function(result) {
    connections = connections + 1;
    debug(`Nuevo usuario conectado ${connections}`);
    result.emit('message', { _id: result.id, msg: 'Bienvenido' });
    result.on('disconnect', function() {
      connections = connections - 1;
      debug(`Usuario desconectado ${connections}`);
    });
  });
}

module.exports = {
  SocketIO,
  socket,
  connections,
};
