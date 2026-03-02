import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import Constants from "expo-constants"
import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
} from "expo-notifications"
import dailyLentData from "../data/lentFinalOutput.json"
import { DailyNotificationTime } from "@/app/onboarding/step2"
import { useCallback } from "react"
import { useAppSettingActions, useAppSettings } from "@/stores/AppStore"
import { Platform } from "react-native"

// TODO: update this every day for the first day of lent
export const FIRST_DAY_OF_LENT = new Date("2026-02-13T00:00:00-08:00")
export const getCurrentDayOfLent = (todayDate: Date) =>
  Math.floor(
    (todayDate.getTime() - FIRST_DAY_OF_LENT.getTime()) / (1000 * 60 * 60 * 24),
  )

export const scheduleDailyLentNotifications = async (
  hourOfDayIn24hTime: number,
) => {
  // get the current day of lent to use as starting point to schedule all future notifications
  const currentDayOfLent = getCurrentDayOfLent(new Date())

  dailyLentData.slice(currentDayOfLent).forEach((dayData, index) => {
    const dayOfLent = currentDayOfLent + index

    const today = new Date()
    const targetDate = new Date(today)

    // // Set the target hour
    targetDate.setHours(hourOfDayIn24hTime, 0, 0, 0)

    // Add days for future notifications
    targetDate.setDate(targetDate.getDate() + index)

    const request: Notifications.NotificationRequestInput = {
      content: {
        title: `${dayData.theme} (Day ${dayOfLent + 1})`,
        body: `${dayData.fatherQuoteText} - ${dayData.fatherQuoteName}`,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: targetDate,
      },
    }

    scheduleNotificationAsync(request)
  })
}

export async function cancelAllNotifications() {
  try {
    await cancelAllScheduledNotificationsAsync()
    useAppSettings.getState().actions.setDailyNotificationTime(undefined)
    console.log("All scheduled notifications have been canceled.")
  } catch (error) {
    console.error("Error canceling scheduled notifications:", error)
  }
}

export const useScheduleNotification = () => {
  const appSettingsActions = useAppSettingActions()

  const onScheduleTime = useCallback(
    async (time: DailyNotificationTime | undefined) => {
      if (time === undefined) {
        return
      }

      const scheduleNotifs = async () => {
        await cancelAllNotifications()
        appSettingsActions.setDailyNotificationTime(time)
        scheduleDailyLentNotifications(parseInt(time["24h"].split(":")[0]))
      }

      const { status } = await Notifications.getPermissionsAsync()
      if (status !== "granted") {
        registerForPushNotificationsAsync().then((token) => {
          scheduleNotifs()
        })
      } else {
        // First clear all existing notifications
        scheduleNotifs()
      }
    },
    [],
  )

  return { onScheduleTime }
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId
      if (!projectId) {
        throw new Error("Project ID not found")
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log(token)
    } catch (e) {
      token = `${e}`
    }
  } else {
    alert("Must use physical device for Push Notifications")
  }

  return token
}
