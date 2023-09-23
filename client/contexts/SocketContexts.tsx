"use client";

import { SERVER_URI } from "@/app/Initialize";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

export const SocketContexts = createContext("");

export const useSocketID = () => useContext(SocketContexts);

export const useSocket = (
  socketID: string = useSocketID(),
  uri?: string,
): Socket =>
  io(uri || SERVER_URI, {
    query: { socketID },
  }) as Socket;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketID, setSocketID] = useState<string>("Starting...");

  useEffect(() => {
    const socket = io(SERVER_URI);

    socket.on("connect", () => {
      console.log(`Socket Connected. [ID = ${socket.id}]`);
      setSocketID(() => socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket Disconnected Due To ${reason}. [ID = ${socket.id}]`);
    });
  }, []);

  return (
    <SocketContexts.Provider value={socketID}>
      {children}
    </SocketContexts.Provider>
  );
};

export default SocketContexts;
