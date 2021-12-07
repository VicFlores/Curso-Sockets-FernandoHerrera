class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      socket.on('client-to-server', (data) => {
        console.log(data);

        this.io.emit('server-to-client', data);
      });
    });
  }
}

module.exports = Sockets;
