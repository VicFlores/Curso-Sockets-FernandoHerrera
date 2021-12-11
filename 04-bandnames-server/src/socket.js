const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');

      socket.emit('band-list', this.bandList.getBands());

      socket.on('votar-banda', (id) => {
        this.bandList.increaseVotes(id);

        this.io.emit('band-list', this.bandList.getBands());
      });

      socket.on('delete-band', (id) => {
        this.bandList.deleteBands(id);

        this.io.emit('band-list', this.bandList.getBands());
      });

      socket.on('change-name', ({ id, newName }) => {
        this.bandList.changeName(id, newName);

        this.io.emit('band-list', this.bandList.getBands());
      });

      socket.on('new-band', (newBand) => {
        this.bandList.createBand(newBand);

        this.io.emit('band-list', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
