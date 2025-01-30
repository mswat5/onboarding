import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <View>
      <Text>Welcome</Text>
      <Text>start ur journey with us </Text>
      <TouchableOpacity onPress={() => router.push("/Onboarding")}>
        <Text>get to main</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
