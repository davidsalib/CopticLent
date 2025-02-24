// app/onboarding/_layout.tsx
import { Stack } from "expo-router";

export default function OnboardingStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
    </Stack>
  );
}
