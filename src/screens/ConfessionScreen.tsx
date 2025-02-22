import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useWebSocket } from "../context/WebSocketProvider";

export default function ConfessionScreen({ navigation }) {
  const { ws } = useWebSocket();
  const [confession, setConfession] = useState("");

  const submitConfession = () => {
    if (confession.trim() === "") return;
    ws.send(JSON.stringify({ type: "submitConfession", text: confession }));
    setConfession("");
    navigation.navigate("Guessing");
  };

  return (
    <View>
      <Text>🤫 Submit Your Anonymous Confession</Text>
      <TextInput
        value={confession}
        onChangeText={setConfession}
        placeholder="Type your confession here..."
      />
      <Button title="Submit" onPress={submitConfession} />
    </View>
  );
}
