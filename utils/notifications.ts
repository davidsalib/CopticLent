import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
} from "expo-notifications";
import dailyLentData from "../data/lentFinalOutput.json";
import { DailyNotificationTime } from "@/app/onboarding/step2";
import { useCallback } from "react";
import { useAppSettingActions, useAppSettings } from "@/stores/AppStore";

// TODO: update this every day for the first day of lent
export const FIRST_DAY_OF_LENT = new Date("2025-02-24T00:00:00-08:00");
export const getCurrentDayOfLent = (todayDate: Date) =>
  Math.floor(
    (todayDate.getTime() - FIRST_DAY_OF_LENT.getTime()) / (1000 * 60 * 60 * 24)
  );

export const scheduleDailyLentNotifications = async (
  hourOfDayIn24hTime: number
) => {
  // get the current day of lent to use as starting point to schedule all future notifications
  const currentDayOfLent = getCurrentDayOfLent(new Date());

  dailyLentData
    .slice(currentDayOfLent, currentDayOfLent + 2)
    .forEach((dayData, index) => {
      const dayOfLent = currentDayOfLent + index;

      const today = new Date();
      const targetDate = new Date(today);

      // Set the target hour
      targetDate.setHours(hourOfDayIn24hTime, 0, 0, 0);

      // Add days for future notifications
      targetDate.setDate(targetDate.getDate() + index);

      scheduleNotificationAsync({
        content: {
          title: `${dayData.theme} (Day ${dayOfLent})`,
          body: `Blessed Lent 🙏 ${dayData.shortExplanation}`,
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: targetDate,
        },
      });
    });
};

export async function cancelAllNotifications() {
  try {
    await cancelAllScheduledNotificationsAsync();
    useAppSettings.getState().actions.setDailyNotificationTime(undefined);
    console.log("All scheduled notifications have been canceled.");
  } catch (error) {
    console.error("Error canceling scheduled notifications:", error);
  }
}

export const useScheduleNotification = () => {
  const appSettingsActions = useAppSettingActions();

  const onScheduleTime = useCallback(
    async (time: DailyNotificationTime | undefined) => {
      if (time === undefined) {
        return;
      }
      // First clear all existing notifications
      await cancelAllNotifications();
      appSettingsActions.setDailyNotificationTime(time);
      scheduleDailyLentNotifications(parseInt(time["24h"].split(":")[0]));
    },
    []
  );

  return { onScheduleTime };
};
