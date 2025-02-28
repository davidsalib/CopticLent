import { Text, View } from "@/components/Themed";
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import sermonsData from "../data/sermons.json";

export default function SermonsTab() {
  return (
    <SafeAreaView>
      <View className="flex flex-col gap-2 px-4 pt-8 pb-4">
        <Text className="uppercase" color="text-neutral-500" size="text-base">
          {new Date().toLocaleDateString()}
        </Text>
        <Text className="font-black" size="text-4xl">
          Sermons
        </Text>
        <Text className="uppercase text-sm" color="text-neutral-400">
          Sermons sourced & linked to Upper Room Media
        </Text>
      </View>
      <ScrollView className="pb-72">
        {sermonsData.map((sermon, index) => (
          <Pressable
            key={index}
            className="flex flex-row gap-4 p-4"
            onPress={() =>
              Linking.openURL(
                `https://subsplash.com${sermon.sermonHref}`
              ).catch((err) => console.error(err))
            }
          >
            <Image
              source={{ uri: sermon.imageURL }}
              className="w-20 h-20 rounded-md bg-neutral-900"
            />
            <View className="flex flex-col flex-1">
              <Text className="text-lg font-semibold">{sermon.title}</Text>
              <Text className="line-clamp-2" color="text-neutral-400">
                {sermon.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const Card = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <View className="flex flex-col gap-2 border-t border-neutral-800 px-4 pt-4">
      <Text className="uppercase" color="text-neutral-500" size="text-base">
        {title}
      </Text>
      {description && (
        <Text color="text-neutral-200" size="text-lg">
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};
