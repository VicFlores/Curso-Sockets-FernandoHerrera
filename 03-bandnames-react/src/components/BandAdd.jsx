import React, { useState } from 'react';

export const BandAdd = ({ newBand }) => {
  const [valor, setValor] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if (valor.trim().length > 0) {
      newBand(valor);

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
