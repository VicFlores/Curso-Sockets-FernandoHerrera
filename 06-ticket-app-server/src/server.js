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
      cors: {
        origin: [
          'http://localhost:4000',
          'https://socket-serv-react.herokuapp.com/',
        ],
        method: ['GET', 'POST'],
      },
    });

    this.sockets = new Sockets(this.io);
  }

  middleware() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
    this.app.get('/ultimos', (req, res, next) => {
      return res.status(200).json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13(),
      });
    });
  }

  execute() {
    this.middleware();

    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

module.exports = Server;
