import React from 'react';
import { App } from '../App';
import { SocketProvider } from '../context/SocketContex';

export const BandName = () => {
  return (
    <SocketProvider>
      <App />
    </SocketProvider>
  );
};
