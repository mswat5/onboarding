import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [quests, setQuests] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("onboarding-form");
        if (savedData) {
          const { firstName, gender, age, goals, quests } =
            JSON.parse(savedData);
          setFirstName(firstName || "");
          setGender(gender || "");
          setAge(age || "");
          setGoals(goals || []);
          setQuests(quests || []);
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };
    loadSavedData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          "onboarding-form",
          JSON.stringify({ firstName, gender, age, goals, quests })
        );
      } catch (error) {
        console.log("Error saving data:", error);
      }
    };
    saveData();
  }, [firstName, gender, age, goals, quests]);

  const steps = [
    {
      title: "Let's get to know you better !",
      subtitle: "Share your name and gender to personalize your experience",
      content: (
        <View className="space-y-8">
          <View className="space-y-2">
            <Text className="text-gray-700 text-lg">First name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="John Doe"
              className="w-full p-4 rounded-2xl bg-gray-50 text-lg"
            />
          </View>

          <View className="space-y-2">
            <Text className="text-gray-700 text-lg">Gender</Text>
            <View className="flex-row space-x-4">
              {[
                { label: "Male", value: "male", icon: "♂" },
                { label: "Female", value: "female", icon: "♀" },
                { label: "Other", value: "other", icon: "⚧" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setGender(option.value)}
                  className={`flex-1 p-4 rounded-2xl border-2 ${
                    gender === option.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      gender === option.value
                        ? "text-indigo-500"
                        : "text-gray-600"
                    }`}
                  >
                    {option.icon} {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ),
    },
    {
      title: "How old are you?",
      subtitle: "This helps us provide age-appropriate recommendations",
      content: (
        <View className="space-y-4">
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
            className="w-full p-4 rounded-2xl bg-gray-50 text-lg"
          />
        </View>
      ),
    },
    {
      title: "What do you want to achieve?",
      subtitle: "What you are going to select will affect your plan",
      content: (
        <View className="space-y-4">
          {[
            { label: "Lose Weight", value: "lose_weight", icon: "🔥" },
            { label: "Gain Weight", value: "gain_weight", icon: "💪" },
            { label: "Strength Training", value: "strength", icon: "🏋️" },
            { label: "Meditation", value: "meditation", icon: "🧘" },
          ].map((goal) => (
            <TouchableOpacity
              key={goal.value}
              onPress={() => {
                const newGoals = goals.includes(goal.value)
                  ? goals.filter((g) => g !== goal.value)
                  : [...goals, goal.value];
                setGoals(newGoals);
              }}
              className={`p-4 rounded-2xl border-2 ${
                goals.includes(goal.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  goals.includes(goal.value)
                    ? "text-indigo-500"
                    : "text-gray-600"
                }`}
              >
                {goal.icon} {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      title: "Choose your first quests",
      subtitle:
        "Select the health challenges you'd like to start with. You can always change these later.",
      content: (
        <View className="space-y-4">
          {[
            { label: "Healthy Eating", value: "healthy_eating", icon: "🥗" },
            { label: "Daily Walks", value: "daily_walks", icon: "🚶" },
            {
              label: "Regular Water Intake",
              value: "water_intake",
              icon: "💧",
            },
            { label: "Weight Lifting", value: "weight_lifting", icon: "🏋️" },
          ].map((quest) => (
            <TouchableOpacity
              key={quest.value}
              onPress={() => {
                const newQuests = quests.includes(quest.value)
                  ? quests.filter((q) => q !== quest.value)
                  : [...quests, quest.value];
                setQuests(newQuests);
              }}
              className={`p-4 rounded-2xl border-2 ${
                quests.includes(quest.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  quests.includes(quest.value)
                    ? "text-indigo-500"
                    : "text-gray-600"
                }`}
              >
                {quest.icon} {quest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return firstName && gender;
      case 1:
        return age;
      case 2:
        return goals.length > 0;
      case 3:
        return quests.length > 0;
      default:
        return false;
    }
  };

  const handleContinue = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("navigate to dashboard:", {
        firstName,
        gender,
        age,
        goals,
        quests,
      });

      // Clear the form data from AsyncStorage
      await AsyncStorage.removeItem("onboarding-form");

      router.push("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      router.back();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={handlePrevious}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-row justify-center space-x-2 mb-12">
        {steps.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-8 rounded-full ${
              i === currentStep ? "bg-indigo-500" : "bg-gray-200"
            }`}
          />
        ))}
      </View>
      <View className="space-y-8">
        <View className="space-y-2">
          <Text className="text-3xl font-semibold text-gray-800">
            {currentStepData.title}
          </Text>
          <Text className="text-gray-600 text-lg">
            {currentStepData.subtitle}
          </Text>
        </View>

        {currentStepData.content}
      </View>
      <View className="mt-auto">
        <TouchableOpacity
          onPress={handleContinue}
          className={`w-full py-4 rounded-xl ${
            isCurrentStepValid() ? "bg-indigo-500" : "bg-indigo-300"
          }`}
          disabled={!isCurrentStepValid()}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
