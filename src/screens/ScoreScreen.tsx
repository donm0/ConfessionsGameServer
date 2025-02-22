import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useWebSocket } from "../context/WebSocketProvider";

export default function ScoreScreen({ navigation }) {
  const { gameState } = useWebSocket();

  const finalScores = Object.entries(gameState.players || {}).map(([id, points]) => ({
    id,
    username: `Player ${id}`, // Replace with actual username if available
    points,
  }));

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        🏆 Final Scores
      </Text>
      <FlatList
        data={finalScores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18 }}>{item.username}: {item.points} points</Text>
        )}
      />
      <Button title="Play Again" onPress={() => navigation.navigate("Lobby")} />
    </View>
  );
}
