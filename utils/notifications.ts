import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
} from "expo-notifications";
import dailyLentData from "../data/lentFinalOutput.json";

// TODO: update this every day for the first day of lent
export const FIRST_DAY_OF_LENT = new Date("2025-02-24T00:00:00-08:00");
export const getCurrentDayOfLent = (todayDate: Date) =>
  Math.floor(
    (todayDate.getTime() - FIRST_DAY_OF_LENT.getTime()) / (1000 * 60 * 60 * 24)
  );

// TODO: add time param
export const scheduleDailyLentNotifications = async (
  hourOfDayIn24hTime: number
) => {
  // First clear all existing notifications
  await cancelAllNotifications();

  // get the current day of lent to use as starting point to schedule all future notifications
  const currentDayOfLent = getCurrentDayOfLent(new Date());

  dailyLentData
    .slice(currentDayOfLent, currentDayOfLent + 5)
    .forEach((dayData, index) => {
      const dayOfLent = currentDayOfLent + index;

      const today = new Date();
      const targetDate = new Date(today);

      // Set the target hour
      targetDate.setHours(hourOfDayIn24hTime, 0, 0, 0);

      // Add days for future notifications
      targetDate.setDate(targetDate.getDate() + index);

      console.log({
        index,
        dayOfLent,
        dayTheme: dayData.theme,
        targetDate: `${targetDate.toLocaleDateString()} ${targetDate.toLocaleTimeString()}`,
      });

      //   scheduleNotificationAsync({
      //     content: {
      //       title: `${dayData.theme} (Day ${dayOfLent})`,
      //       body: `Blessed Lent 🙏 ${dayData.shortExplanation}`,
      //     },
      //     trigger: {
      //       type: SchedulableTriggerInputTypes.DATE,
      //       date: targetDate
      //     },
      //   });
    });
};

async function cancelAllNotifications() {
  try {
    await cancelAllScheduledNotificationsAsync();
    console.log("All scheduled notifications have been canceled.");
  } catch (error) {
    console.error("Error canceling scheduled notifications:", error);
  }
}
