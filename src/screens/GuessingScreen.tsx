import React, { useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useWebSocket } from "../context/WebSocketProvider";

export default function GuessingScreen({ navigation }) {
  const { gameState, ws } = useWebSocket();
  const [confessions, setConfessions] = useState(gameState.messages || []);

  const submitGuess = (guessId) => {
    ws.send(JSON.stringify({ type: "submitGuess", guessedUserId: guessId }));
    Alert.alert("Guess submitted!");
  };

  return (
    <View>
      <Text>🕵️ Guess Who Wrote This</Text>
      <FlatList
        data={confessions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Button title="Submit Guess" onPress={() => submitGuess(item.userId)} />
          </View>
        )}
      />
    </View>
  );
}
