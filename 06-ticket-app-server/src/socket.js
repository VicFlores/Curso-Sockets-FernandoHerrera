const TicketList = require('./models/ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');

      socket.on('newTicket', (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });

      socket.on('nextTicket', ({ agente, escritorio }, callback) => {
        const suTicket = this.ticketList.asignarTicket(agente, escritorio);
        callback(suTicket);

        this.io.emit('ticketAsignado', this.ticketList.ultimos13());
      });
    });
  }
}

module.exports = Sockets;
