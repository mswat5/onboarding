import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { getLocales, getCalendars, Localization } from "expo-localization";

const Welcome = () => {
  const localdata = getCalendars();
  return (
    <View>
      <Text>Welcome</Text>
      <Text>start ur journey with us </Text>
      <TouchableOpacity onPress={() => router.push("/onboarding")}>
        <Text>get to main</Text>
      </TouchableOpacity>
      <Text>localdata.timeZone</Text>
    </View>
  );
};

export default Welcome;
