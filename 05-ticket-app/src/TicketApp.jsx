import React from 'react';
import { UIProvider } from './context/UIContext';
import { Home } from './pages/Home';

export const TicketApp = () => {
  return (
    <UIProvider>
      <Home />
    </UIProvider>
  );
};
