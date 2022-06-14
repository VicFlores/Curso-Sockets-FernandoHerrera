const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastNumber = 0;

    this.pendientes = [];
    this.asignados = [];
  }

  SiguienteNumero() {
    this.lastNumber++;
    return this.lastNumber;
  }

  ultimos13() {
    return this.asignados.slice(0, 13);
  }

  crearTicket() {
    const newTicket = new Ticket(this.SiguienteNumero());
    this.pendientes.push(newTicket);
    return newTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length === 0) {
      return null;
    }

    const siguienteTicket = this.pendientes.shift();

    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    this.asignados.unshift(siguienteTicket);

    return siguienteTicket;
  }
}

module.exports = TicketList;
