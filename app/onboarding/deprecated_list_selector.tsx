// app/onboarding/Screen3.tsx
import { Text, View } from "@/components/Themed";
import { classNames } from "@/utils/style";
import { useRouter } from "expo-router";
import { Button, SafeAreaView, ScrollView } from "react-native";

export default function Onboarding1() {
  const router = useRouter();

  return (
    <View>
      <View className="bg-neutral-900">
        <SafeAreaView>
          <View className="px-4 pb-8 pt-4 gap-2 flex flex-col">
            <Text size="text-4xl" className="font-bold">
              Daily Reminders
            </Text>
            <Text color="text-neutral-400">
              Tap a reminder to schedule the daily reminders you would like to
              receive during lent
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView className="flex pt-4 bg-black">
        {NotificationTypes.map((item, index) => {
          if (item.type === "header") {
            return (
              <View
                className={classNames(
                  " pb-4 px-4 border-b border-b-neutral-800",
                  index !== 0 ? "pt-8" : "pt-0"
                )}
                key={index}
              >
                <Text
                  className="text-sm font-bold tracking-wide uppercase"
                  color="text-neutral-500"
                >
                  {item.title}
                </Text>
              </View>
            );
          } else {
            return (
              <View
                className="p-4 border-b flex flex-row gap-16 items-center justify-between border-b-neutral-800"
                key={index}
              >
                <View className="flex flex-1">
                  <Text className="text-xl font-bold">{item.title}</Text>
                  <Text color="text-neutral-400" size="text-sm">
                    {item.description}
                  </Text>
                </View>
                {index === 1 ? (
                  <Text className="flex" color="text-orange-300">
                    8:00am
                  </Text>
                ) : (
                  <Text className="font-bold" color="text-neutral-400">
                    Schedule
                  </Text>
                )}
              </View>
            );
          }
        })}
      </ScrollView>
      <View className="bg-neutral-900">
        <SafeAreaView>
          <View className="px-4  gap-2 flex flex-col">
            <Button
              title="Next"
              onPress={() => router.push("/onboarding/step2")}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const NotificationTypes = [
  { type: "header", title: "Lent" },
  {
    title: "Lenten Theme & Quote",
    description:
      "Lenten theme of the day and a related quote from the church fathers",
  },
  {
    title: "Lenten Bible Reading",
    description: "Lenten bible reading of the day ",
  },
  { type: "header", title: "Agpeya" },
  {
    title: "1st Hour",
    description: "A reminder to pray the first hour of the day",
  },
  {
    title: "3rd Hour",
    description: "A reminder to pray the third hour of the day",
  },
  {
    title: "6th Hour",
    description: "A reminder to pray the sixth hour of the day",
  },
  {
    title: "9th Hour",
    description: "A reminder to pray the ninth hour of the day",
  },
  {
    title: "12th Hour",
    description: "A reminder to pray the twelfth hour of the day",
  },
];
