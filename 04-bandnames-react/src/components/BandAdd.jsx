import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContex';

export const BandAdd = () => {
  const [valor, setValor] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (event) => {
    event.preventDefault();

    if (valor.trim().length > 0) {
      socket.emit('new-band', valor);

      setValor('');
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nuevo nombre de banda"
          className="form-control"
          value={valor}
          onChange={(event) => setValor(event.target.value)}
        />
      </form>
    </>
  );
};
