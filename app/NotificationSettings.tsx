import { StatusBar } from "expo-status-bar";
import { Alert, Platform, SafeAreaView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Picker } from "@react-native-picker/picker";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import { useState } from "react";
import { NOTIFICATION_TIMES } from "./onboarding/step2";
import Button from "@/components/Button";
import {
  cancelAllNotifications,
  useScheduleNotification,
} from "@/utils/notifications";
import {
  useAppSettingActions,
  useDailyNotificationTime,
} from "@/stores/AppStore";

export default function ModalScreen() {
  const currentNotificationTime = useDailyNotificationTime();
  const { onScheduleTime } = useScheduleNotification(currentNotificationTime);
  const appSettingActions = useAppSettingActions();
  const [isSchedulingNotifications, setIsSchedulingNotifications] =
    useState(false);

  const DefaultView = (
    <View className="flex flex-col items-center justify-center h-full gap-8">
      <View className="flex flex-col items-center justify-center gap-2 px-6">
        <Text className="font-bold text-center" size="text-3xl">
          Your daily lent notification is scheduled at{" "}
          {currentNotificationTime["12h"]}
        </Text>
      </View>
      <View>
        {currentNotificationTime !== undefined ? (
          <>
            <Button
              onPress={() => {
                setIsSchedulingNotifications(true);
              }}
            >
              Change Notification Time
            </Button>
            <Button
              variant="secondary"
              onPress={() => {
                cancelAllNotifications();

                Alert.alert("Daily notifications unscheduled ✅");
              }}
            >
              Turn Off Notifications
            </Button>
          </>
        ) : (
          <Button onPress={() => setIsSchedulingNotifications(true)}>
            Schedule Notifications
          </Button>
        )}
      </View>
    </View>
  );

  const ScheduleView = (
    <View className="flex flex-col items-center justify-center h-full gap-8">
      <View className="flex flex-col items-center justify-center gap-2 px-6">
        <Text className="font-bold text-center" size="text-3xl">
          When would you like to receive your daily lent notification?
        </Text>
      </View>

      <Picker
        style={{
          width: "100%",
        }}
        itemStyle={{
          height: 150,
          fontSize: 16,
          color: TailwindColorsHexCodes.neutral[200],
        }}
        selectedValue={currentNotificationTime["24h"]}
        onValueChange={(itemValue, itemIndex) =>
          appSettingActions.setDailyNotificationTime(
            NOTIFICATION_TIMES[itemIndex]
          )
        }
      >
        {NOTIFICATION_TIMES.map((time) => (
          <Picker.Item
            key={time["24h"]}
            label={time["12h"]}
            value={time["24h"]}
          />
        ))}
      </Picker>

      <View className="flex flex-col items-center gap-4">
        <Button
          onPress={() => {
            onScheduleTime();
            Alert.alert(
              `Daily notifications scheduled every day at ${currentNotificationTime["12h"]} ✅`,
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setIsSchedulingNotifications(false);
                  },
                },
              ]
            );
          }}
        >
          Schedule Daily at {currentNotificationTime["12h"]}
        </Button>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      {isSchedulingNotifications ? ScheduleView : DefaultView}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
