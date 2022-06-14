import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (pathServer) => {
  const [online, setOnline] = useState(false);

  const socket = useMemo(
    () =>
      io(pathServer, {
        transports: ['websocket'],
      }),
    [pathServer]
  );

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

  return { socket, online };
};
