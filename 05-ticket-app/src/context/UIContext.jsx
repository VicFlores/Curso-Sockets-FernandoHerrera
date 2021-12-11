import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [MenuHidden, setMenuHidden] = useState(false);

  const showMenu = () => {
    setMenuHidden(false);
  };

  const hideMenu = () => {
    setMenuHidden(true);
  };

  return (
    <UIContext.Provider
      value={{
        MenuHidden,
        showMenu,
        hideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
