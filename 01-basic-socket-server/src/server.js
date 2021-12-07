const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./socket');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middleware() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(
      cors({
        origin: [
          'http://localhost:4000/',
          'https://socket-serv-react.herokuapp.com/',
        ],
      })
    );
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middleware();

    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

module.exports = Server;
