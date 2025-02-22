const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8080;

// Store active lobbies
const lobbies = {};

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("✅ New WebSocket connection established!");

  ws.on("message", (message) => {
    console.log("📩 Received message:", message);
    const data = JSON.parse(message);

    if (data.type === "createLobby") {
      const lobbyId = Math.random().toString(36).substring(2, 10);
      lobbies[lobbyId] = { id: lobbyId, players: [data.user] };

      ws.send(JSON.stringify({ type: "lobbyCreated", lobbyId }));
      console.log(`🏠 Lobby ${lobbyId} created by ${data.user.username}`);
    }

    if (data.type === "joinLobby" && lobbies[data.lobbyId]) {
      lobbies[data.lobbyId].players.push(data.user);
      console.log(`👤 ${data.user.username} joined lobby ${data.lobbyId}`);

      // Send updated lobby list
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "updateLobbies", lobbies: Object.values(lobbies) }));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("❌ A WebSocket connection closed.");
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

server.listen(PORT, () => {
  console.log(`✅ WebSocket server running on port ${PORT}`);
});
