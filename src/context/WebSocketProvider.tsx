import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<any>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState({ players: [], messages: [] });

  useEffect(() => {
    const newWs = new WebSocket("wss://confessionsgameserver.onrender.com"); // Replace with actual WebSocket URL
    newWs.onopen = () => console.log("✅ Connected to WebSocket server!");
    newWs.onclose = () => console.warn("⚠️ WebSocket Disconnected!");

    setWs(newWs);
    return () => newWs.close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, gameState }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
