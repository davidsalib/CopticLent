// app/onboarding/Screen3.tsx
import { Text, View } from "@/components/Themed";
import { classNames } from "@/utils/style";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Step1() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex flex-col items-center justify-center h-full gap-16">
        <View className="flex flex-col items-center justify-center gap-2">
          <Text className="font-bold" size="text-3xl">
            The Coptic Lent App
          </Text>
          <Text className="text-center max-w-xs" color="text-neutral-400">
            Live the Holy Lent daily with notifications including everyday's
            theme, quote, and Bible readings
          </Text>
        </View>
        <MockNotification />
        <MockNotification className="-mt-40 -z-20 scale-95 opacity-50" />

        <Button
          title="Get Started"
          onPress={() => router.push("/onboarding/step2")}
        />
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
      <View className="h-10 w-10 rounded-lg bg-neutral-800" />
      <View className="flex flex-col gap-1 flex-1">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold">Build on the Rock</Text>
          <Text color="text-neutral-400" size="text-sm">
            now
          </Text>
        </View>
        <Text color="text-neutral-400" size="text-sm" className="line-clamp-4">
          Blessed 12th day of Lent. Today's theme emphasizes the importance of
          not only hearing Christ's teachings but also actively implementing
          them in one's life, thereby establishing a strong spiritual foundation
          capable of withstanding life's challenges
        </Text>
      </View>
    </View>
  );
};
