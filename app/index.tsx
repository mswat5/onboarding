import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 flex-col justify-between items-center  w-full max-w-md space-y-12 p-6 ">
      <View className="flex flex-row items-center space-x-3">
        <Image
          source={require("../assets/images/logo-mini.png")}
          style={{ height: 30, width: 30 }}
          contentFit="contain"
        />
        <Text className="font-bold text-3xl text-indigo-600">Lyfelynk</Text>
      </View>

      <Image
        source={require("../assets/images/signin.png")}
        style={{ height: 300, width: "100%" }}
        contentFit="contain"
      />

      <Text className="text-lg text-gray-700 text-center">
        <Text className="text-3xl text-gray-600">Access,</Text>{" "}
        <Text className="text-3xl text-gray-600">Track,</Text> and Monetize your
        health.
      </Text>

      <View className=" w-full">
        <TouchableOpacity
          className="w-full bg-indigo-600 py-4 rounded-lg shadow-md active:bg-indigo-700"
          onPress={() => {
            router.push("/onboarding");
          }}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
