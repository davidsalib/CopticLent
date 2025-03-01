// app/onboarding/Screen3.tsx
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { useState } from "react";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";

import { useScheduleNotification } from "@/utils/notifications";
import Button from "@/components/Button";
import { useAppSettingActions } from "@/stores/AppStore";

export default function Step1() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(NOTIFICATION_TIMES[8]);
  const { onScheduleTime } = useScheduleNotification(selectedTime);
  const appSettingActions = useAppSettingActions();

  const onCompleteOnboarding = () => {
    appSettingActions.setOnboardingComplete(true);
    router.push("/Today");
  };
  return (
    <SafeAreaView>
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
          selectedValue={selectedTime["24h"]}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedTime(NOTIFICATION_TIMES[itemIndex])
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
              onCompleteOnboarding();
            }}
          >
            Schedule Daily at {selectedTime["12h"]}
          </Button>
          <Button onPress={onCompleteOnboarding} variant="text">
            <Text color="text-neutral-500" size="text-lg">
              Continue without scheduling
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export type DailyNotificationTime = { "24h": string; "12h": string };

export const NOTIFICATION_TIMES: DailyNotificationTime[] = [
  { "24h": "00:00", "12h": "12:00am" },
  { "24h": "01:00", "12h": "01:00am" },
  { "24h": "02:00", "12h": "02:00am" },
  { "24h": "03:00", "12h": "03:00am" },
  { "24h": "04:00", "12h": "04:00am" },
  { "24h": "05:00", "12h": "05:00am" },
  { "24h": "06:00", "12h": "06:00am" },
  { "24h": "07:00", "12h": "07:00am" },
  { "24h": "08:00", "12h": "08:00am" },
  { "24h": "09:00", "12h": "09:00am" },
  { "24h": "10:00", "12h": "10:00am" },
  { "24h": "11:00", "12h": "11:00am" },
  { "24h": "12:00", "12h": "12:00pm" },
  { "24h": "13:00", "12h": "1:00pm" },
  { "24h": "14:00", "12h": "2:00pm" },
  { "24h": "15:00", "12h": "3:00pm" },
  { "24h": "16:00", "12h": "4:00pm" },
  { "24h": "17:00", "12h": "5:00pm" },
  { "24h": "18:00", "12h": "6:00pm" },
  { "24h": "19:00", "12h": "7:00pm" },
  { "24h": "20:00", "12h": "8:00pm" },
  { "24h": "21:00", "12h": "9:00pm" },
  { "24h": "22:00", "12h": "10:00pm" },
  { "24h": "23:00", "12h": "11:00pm" },
];
