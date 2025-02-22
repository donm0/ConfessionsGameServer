import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebSocketProvider } from "./src/context/WebSocketProvider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App(): JSX.Element {
  return (
    <WebSocketProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaView>
    </WebSocketProvider>
  );
}
