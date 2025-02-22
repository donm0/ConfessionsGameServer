import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import { useWebSocket } from "../context/WebSocketProvider";

export default function LobbyScreen({ navigation }) {
  const { ws, gameState } = useWebSocket();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (gameState.players) setPlayers(gameState.players);
  }, [gameState.players]);

  const startGame = () => {
    if (players.length > 0) {
      ws.send(JSON.stringify({ type: "startGame" }));
      navigation.navigate("Confession");
    } else {
      Alert.alert("Not enough players to start.");
    }
  };

  return (
    <View>
      <Text>📝 Confessions Game Lobby</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
      <TouchableOpacity onPress={startGame}>
        <Text>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}
