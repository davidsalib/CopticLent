import CustomPressable from "@/components/CustomPressable";
import { Text, View } from "@/components/Themed";
import { useDailyNotificationTime } from "@/stores/AppStore";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, SafeAreaView } from "react-native";
const SHARE_FEEDBACK_URL =
  "https://form.asana.com/?k=YrQBDIiFvrTptrFRdLS6bQ&d=1128054213135307";

const SettingsScreen = () => {
  const router = useRouter();
  const scheduledNotificationTime = useDailyNotificationTime();
  console.log(scheduledNotificationTime);
  return (
    <View>
      <SafeAreaView className="gap-4 flex flex-col">
        <View className="px-4">
          <Text className="font-black" size="text-4xl">
            Settings
          </Text>
        </View>
        <View className="flex flex-col gap-4 px-4">
          <CustomPressable
            className="flex flex-row items-center p-4 bg-neutral-900 rounded-md justify-between"
            onPress={() => router.navigate("../NotificationSettings")}
          >
            <Text className="font-semibold" size="text-lg">
              Notification Time
            </Text>
            <Text>
              {scheduledNotificationTime
                ? `Daily at ${scheduledNotificationTime["12h"]}`
                : "Unscheduled"}
            </Text>
          </CustomPressable>
          <CustomPressable
            className="flex flex-row items-center p-4 bg-neutral-900 rounded-md justify-between"
            onPress={() =>
              Linking.openURL(SHARE_FEEDBACK_URL).catch((err) =>
                console.error(err)
              )
            }
          >
            <Text className="font-semibold" size="text-lg">
              Share Feedback
            </Text>
            <FontAwesome
              name="external-link"
              size={16}
              color={TailwindColorsHexCodes.neutral[400]}
            />
          </CustomPressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
