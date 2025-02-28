// app/onboarding/Screen3.tsx
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { MockNotification } from "./step1";
import { useState } from "react";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
} from "expo-notifications";
import CustomPressable from "@/components/CustomPressable";

export default function Step1() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(TIMES[8]);

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
            setSelectedTime(TIMES[itemIndex])
          }
        >
          {TIMES.map((time) => (
            <Picker.Item
              key={time["24h"]}
              label={time["12h"]}
              value={time["24h"]}
            />
          ))}
        </Picker>

        <View className="flex flex-col items-center gap-4">
          <CustomPressable
            onPress={() => {
              scheduleNotificationAsync({
                content: {
                  title: "Hi",
                  body: "this is cool",
                },
                trigger: {
                  type: SchedulableTriggerInputTypes.DATE,
                  date: new Date(new Date().getTime() + 10000),
                },
              });
              // router.push("/Today");
            }}
          >
            Schedule Daily at {selectedTime["12h"]}
          </CustomPressable>
          <CustomPressable onPress={() => router.push("/Today")} variant="text">
            <Text color="text-neutral-500" size="text-lg">
              Continue without scheduling
            </Text>
          </CustomPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const TIMES = [
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
