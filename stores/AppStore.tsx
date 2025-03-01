import {
  DailyNotificationTime,
  NOTIFICATION_TIMES,
} from "@/app/onboarding/step2";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppSettingsState {
  dailyNotificationTime: DailyNotificationTime | undefined;
  acceptedAIGeneratedContent: boolean;
  isOnboardingComplete: boolean;
}

interface AppSettingsActions {
  setDailyNotificationTime: (
    dailyNotificationTime: DailyNotificationTime
  ) => void;
  setAcceptedAIGeneratedContent: (acceptedAIGeneratedContent: boolean) => void;
  setOnboardingComplete: (isOnboardingComplete: boolean) => void;
}

interface AppSettingsStore extends AppSettingsState {
  actions: AppSettingsActions;
}

export const useAppSettings = create<AppSettingsStore>()(
  persist(
    (set) => ({
      dailyNotificationTime: undefined,
      isOnboardingComplete: false,
      acceptedAIGeneratedContent: false,
      actions: {
        setDailyNotificationTime: (
          dailyNotificationTime: DailyNotificationTime | undefined
        ) => set({ dailyNotificationTime }),
        setOnboardingComplete: (isOnboardingComplete: boolean) =>
          set({ isOnboardingComplete }),
        setAcceptedAIGeneratedContent: (acceptedAIGeneratedContent: boolean) =>
          set({ acceptedAIGeneratedContent }),
      },
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { actions, ...rest } = state;
        return rest;
      },
    }
  )
);

export const useAppSettingActions = () =>
  useAppSettings((state) => state.actions);
export const useDailyNotificationTime = () =>
  useAppSettings((state) => state.dailyNotificationTime);
export const useAcceptedAIGeneratedContent = () =>
  useAppSettings((state) => state.acceptedAIGeneratedContent);
export const useIsOnboardingComplete = () =>
  useAppSettings((state) => state.isOnboardingComplete);
