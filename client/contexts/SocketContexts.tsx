"use client";

import { SERVER_URI } from "@/contexts/AppConfigContext";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

export const SocketContexts = createContext<Socket | null>(null);
export const SocketIDContexts = createContext("");

export const useSocketID = () => useContext(SocketIDContexts);

export const useSocket = (socketID?: string, uri?: string): Socket | null =>
  !(socketID && uri)
    ? useContext(SocketContexts)
    : io(uri || SERVER_URI, {
        query: { socketID },
      });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketID, setSocketID] = useState<string>("Starting...");

  const socket = io(SERVER_URI);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(`Socket Connected. [ID = ${socket.id}]`);
      setSocketID(() => socket.id);
    });

    socket?.on("disconnect", (reason) => {
      console.log(`Socket Disconnected Due To ${reason}. [ID = ${socket.id}]`);
    });

    return () => {
      socket?.removeAllListeners();
    };
  }, []);

  return (
    <SocketContexts.Provider value={socket}>
      <SocketIDContexts.Provider value={socketID}>
        {children}
      </SocketIDContexts.Provider>
    </SocketContexts.Provider>
  );
};

export default SocketProvider;
