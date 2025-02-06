import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

// // Enable automatic tracking of observable changes
// enableReactTracking({
//   auto: true,
// });

type Step = {
  title: string;
  subtitle: string;
  content: JSX.Element;
};

const state$ = observable({
  currentStep: 0,
  firstName: "",
  gender: "",
  age: "",
  goals: [] as string[],
  quests: [] as string[],
});

// // Configure persistence
// persistObservable(state$, {
//   local: "onboarding-form",
//   plugin: ObservablePersistLocalStorage,
// });

const Onboarding = () => {
  const currentStep = state$.currentStep.get();

  const steps: Step[] = [
    {
      title: "Let's get to know you better !",
      subtitle: "Share your name and gender to personalize your experience",
      content: (
        <View className="space-y-8">
          <View className="space-y-2">
            <Text className="text-gray-700 text-lg">First name</Text>
            <TextInput
              value={state$.firstName.get()}
              onChangeText={(text) => state$.firstName.set(text)}
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
                  onPress={() => state$.gender.set(option.value)}
                  className={`flex-1 p-4 rounded-2xl border-2 ${
                    state$.gender.get() === option.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      state$.gender.get() === option.value
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
            value={state$.age.get()}
            onChangeText={(text) => state$.age.set(text)}
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
                const newGoals = state$.goals.get().includes(goal.value)
                  ? state$.goals.get().filter((g) => g !== goal.value)
                  : [...state$.goals.get(), goal.value];
                state$.goals.set(newGoals);
              }}
              className={`p-4 rounded-2xl border-2 ${
                state$.goals.get().includes(goal.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  state$.goals.get().includes(goal.value)
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
                const newQuests = state$.quests.get().includes(quest.value)
                  ? state$.quests.get().filter((q) => q !== quest.value)
                  : [...state$.quests.get(), quest.value];
                state$.quests.set(newQuests);
              }}
              className={`p-4 rounded-2xl border-2 ${
                state$.quests.get().includes(quest.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  state$.quests.get().includes(quest.value)
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
        return state$.firstName.get() && state$.gender.get();
      case 1:
        return state$.age.get();
      case 2:
        return state$.goals.get().length > 0;
      case 3:
        return state$.quests.get().length > 0;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      state$.currentStep.set(currentStep + 1);
    } else {
      console.log("navigate to dashboard:", {
        firstName: state$.firstName.get(),
        gender: state$.gender.get(),
        age: state$.age.get(),
        goals: state$.goals.get(),
        quests: state$.quests.get(),
      });
      router.push("/dashboard");

      // Reset the form after successful completion
      state$.set({
        currentStep: 0,
        firstName: "",
        gender: "",
        age: "",
        goals: [],
        quests: [],
      });
    }
  };
  const handlePrevious = () => {
    if (currentStep === 0) {
      router.back();
    } else {
      state$.currentStep.set(currentStep - 1);
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
