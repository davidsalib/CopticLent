import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <View className="flex-1 ">
      <Text className="" fontSize="text-sm">
        Tab One
      </Text>
      <View className="my-4 h-[1px]" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
