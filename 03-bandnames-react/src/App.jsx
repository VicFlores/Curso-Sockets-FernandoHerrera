import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocket = () => {
  const socket = io('localhost:4000', {
    transports: ['websocket'],
  });
  return socket;
};

export const App = () => {
  const [socket] = useState(connectSocket());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('band-list', (data) => {
      setBands(data);
    });
  }, [socket]);

  const votar = (id) => {
    socket.emit('votar-banda', id);
  };

  const deleteBand = (id) => {
    socket.emit('delete-band', id);
  };

  const newName = (id, newName) => {
    socket.emit('change-name', { id, newName });
  };

  const newBand = (band) => {
    socket.emit('new-band', band);
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Bandnames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            votar={votar}
            eliminar={deleteBand}
            editar={newName}
          />
        </div>

        <div className="col-4">
          <BandAdd newBand={newBand} />
        </div>
      </div>
    </div>
  );
};
