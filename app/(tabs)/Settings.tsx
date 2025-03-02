import CustomPressable from "@/components/CustomPressable";
import { Text, View } from "@/components/Themed";
import { useDailyNotificationTime } from "@/stores/AppStore";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, SafeAreaView } from "react-native";
const SHARE_FEEDBACK_URL =
	"https://form.asana.com/?k=YrQBDIiFvrTptrFRdLS6bQ&d=1128054213135307";
const DONATE_URL = "https://catenabible.com/donate";

const SettingsScreen = () => {
	const router = useRouter();
	const scheduledNotificationTime = useDailyNotificationTime();

	return (
		<View>
			<SafeAreaView className="flex flex-col gap-4">
				<View className="px-4 pt-8">
					<Text className="font-black" size="text-4xl">
						Settings
					</Text>
				</View>
				<View className="flex flex-col gap-4 px-4">
					<CustomPressable
						className="flex flex-row items-center justify-between p-4 rounded-md bg-neutral-900"
						onPress={() =>
							router.navigate("../NotificationSettings")
						}
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
						className="flex flex-row items-center justify-between p-4 rounded-md bg-neutral-900"
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
					<CustomPressable
						className="flex flex-row items-center justify-between p-4 rounded-md bg-neutral-900"
						onPress={() =>
							Linking.openURL(DONATE_URL).catch((err) =>
								console.error(err)
							)
						}
					>
						<Text className="font-semibold" size="text-lg">
							Donate
						</Text>
						<FontAwesome
							name="external-link"
							size={16}
							color={TailwindColorsHexCodes.neutral[400]}
						/>
					</CustomPressable>
				</View>
				<View className="flex gap-6 px-8 pt-8">
					<Text
						className="font-semibold uppercase"
						size="text-sm"
						color="text-neutral-600"
					>
						Acknowledgments
					</Text>
					<CustomPressable
						className="flex flex-row items-center gap-2"
						onPress={() =>
							Linking.openURL(
								"https://www.suscopts.org/pdf/journeythroughtheholyfast.pdf"
							)
						}
					>
						<Text
							className="flex-1"
							color="text-neutral-600"
							size="text-sm"
						>
							Daily Lenten themes sourced from SUS Copts "The Holy
							Great Fast - The Holy Spiritual Struggle”
						</Text>
						<FontAwesome
							name="external-link"
							size={16}
							color={TailwindColorsHexCodes.neutral[600]}
						/>
					</CustomPressable>
					<CustomPressable
						className="flex flex-row items-center gap-2"
						onPress={() =>
							Linking.openURL(
								"https://ugc.production.linktr.ee/70afeea1-0303-4296-8fd0-c854810c993c_AP-Lent-Books.pdf"
							)
						}
					>
						<Text
							className="flex-1"
							color="text-neutral-600"
							size="text-sm"
						>
							Books sourced from Fr. Antony Paul's Lent book
							recommendations
						</Text>
						<FontAwesome
							name="external-link"
							size={16}
							color={TailwindColorsHexCodes.neutral[600]}
						/>
					</CustomPressable>
					<CustomPressable
						className="flex flex-row items-center gap-2"
						onPress={() =>
							Linking.openURL(
								"https://upperroommedia.org/sermons"
							)
						}
					>
						<Text
							className="flex-1"
							color="text-neutral-600"
							size="text-sm"
						>
							Sermons sourced from Upper Room Media
						</Text>
						<FontAwesome
							name="external-link"
							size={16}
							color={TailwindColorsHexCodes.neutral[600]}
						/>
					</CustomPressable>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default SettingsScreen;
