import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="light" translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaView>
  );
}
