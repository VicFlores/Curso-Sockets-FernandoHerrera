import React from 'react';
import { SocketProvider } from './context/SocketContex';
import { UIProvider } from './context/UIContext';
import { Home } from './pages/Home';

export const TicketApp = () => {
  return (
    <SocketProvider>
      <UIProvider>
        <Home />
      </UIProvider>
    </SocketProvider>
  );
};
