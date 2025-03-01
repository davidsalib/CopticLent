// app/onboarding/Screen3.tsx
import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { classNames } from "@/utils/style";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Step1() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col flex items-center">
        <Image
          source={require("../../data/images/coptic-cross-white.png")}
          className="absolute h-1/2 w-full opacity-5"
        />
        <View className="flex flex-col items-center justify-center h-full gap-16">
          <View className="flex flex-col items-center justify-center gap-2">
            <Text className="font-bold text-center" size="text-4xl">
              Daily Coptic Lent Reminders
            </Text>
            <Text
              className="text-center max-w-sm"
              size="text-base"
              color="text-neutral-400"
            >
              Live the Holy Lent daily reminders of each day's unique theme and
              Bible readings
            </Text>
          </View>
          <MockNotification />
          <MockNotification className="-mt-40 -z-20 scale-95 opacity-50" />

          <Button onPress={() => router.push("/onboarding/step2")}>
            Get Started
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const MockNotification = ({ className }: { className?: string }) => {
  return (
    <View
      className={classNames(
        `bg-neutral-900  p-5 flex flex-row items-center gap-4 rounded-xl w-full max-w-sm`,
        className
      )}
    >
      <View className="h-10 w-10 rounded-lg bg-neutral-800 overflow-hidden">
        <Image
          source={require("../../assets/images/lent-app-icon.png")}
          className="w-full h-full"
        />
      </View>
      <View className="flex flex-col gap-1 flex-1">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold">Hope in Faith (Day 31)</Text>
          <Text color="text-neutral-400" size="text-sm">
            now
          </Text>
        </View>
        <Text color="text-neutral-400" size="text-sm" className="line-clamp-4">
          Let us strive to enter by the narrow gate. Just as the trees, if they
          have not stood before the winter's storms, cannot bear fruit, so it is
          with us; this present age is a storm, and it is only through many
          trials and temptations that we can obtain an inheritance in the
          kingdom of heaven.
        </Text>
      </View>
    </View>
  );
};
