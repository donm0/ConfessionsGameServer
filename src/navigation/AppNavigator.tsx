import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LobbyScreen from "../screens/LobbyScreen";
import ConfessionScreen from "../screens/ConfessionScreen";
import GuessingScreen from "../screens/GuessingScreen";
import ScoreScreen from "../screens/ScoreScreen";

const Stack = createStackNavigator();

export default function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Confession" component={ConfessionScreen} />
        <Stack.Screen name="Guessing" component={GuessingScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
