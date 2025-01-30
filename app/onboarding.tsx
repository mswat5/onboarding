import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm, Controller } from "react-hook-form";

type Step = {
  title: string;
  subtitle: string;
  content: JSX.Element;
};

const Onboarding = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    gender: "",
    age: "",
    goals: [] as string[],
    quests: [] as string[],
  });

  const steps: Step[] = [
    {
      title: "Let's get to know you better !",
      subtitle: "Share your name and gender to personalize your experience",
      content: (
        <View className="space-y-8">
          <View className="space-y-2">
            <Text className="text-gray-700 text-lg">First name</Text>
            <TextInput
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, firstName: text }))
              }
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
                  onPress={() =>
                    setFormData((prev) => ({ ...prev, gender: option.value }))
                  }
                  className={`flex-1 p-4 rounded-2xl border-2 ${
                    formData.gender === option.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      formData.gender === option.value
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
            value={formData.age}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, age: text }))
            }
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
                const newGoals = formData.goals.includes(goal.value)
                  ? formData.goals.filter((g) => g !== goal.value)
                  : [...formData.goals, goal.value];
                setFormData((prev) => ({ ...prev, goals: newGoals }));
              }}
              className={`p-4 rounded-2xl border-2 ${
                formData.goals.includes(goal.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  formData.goals.includes(goal.value)
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
                const newQuests = formData.quests.includes(quest.value)
                  ? formData.quests.filter((q) => q !== quest.value)
                  : [...formData.quests, quest.value];
                setFormData((prev) => ({ ...prev, quests: newQuests }));
              }}
              className={`p-4 rounded-2xl border-2 ${
                formData.quests.includes(quest.value)
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`${
                  formData.quests.includes(quest.value)
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
        return formData.firstName && formData.gender;
      case 1:
        return formData.age;
      case 2:
        return formData.goals.length > 0;
      case 3:
        return formData.quests.length > 0;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("navigate to dashboard:", formData);
    }
  };
  const handlePrevious = () => {
    if (currentStep == 0) {
      router.back();
    } else {
      setCurrentStep((prev) => prev - 1);
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
