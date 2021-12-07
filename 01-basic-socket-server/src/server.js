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
    this.whitelist = [
      'http://localhost:4000',
      'https://socket-serv-react.herokuapp.com/',
    ];

    this.options = {
      origin: (origin, callback) => {
        if (this.whitelist.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('no permitido'));
        }
      },
    };

    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {
      cors: {
        origin: this.options,
        credentials: true,
      },
    });
  }

  middleware() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors(this.options));
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
