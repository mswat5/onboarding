import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="onboarding" />

      <Stack.Screen name="index" />
    </Stack>
  );
}
