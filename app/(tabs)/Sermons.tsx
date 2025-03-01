import { Text, View } from "@/components/Themed";
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import sermonsData from "../../data/sermons.json";
import Button from "@/components/Button";

export default function SermonsTab() {
  return (
    <SafeAreaView>
      <View className="flex  px-4 pt-8 pb-4">
        <Text className="font-black" size="text-4xl">
          Sermons
        </Text>
      </View>
      <ScrollView contentContainerClassName="flex flex-col items-center gap-8 pb-36">
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
              <Text
                className="line-clamp-1 font-semibold"
                color="text-neutral-400"
              >
                {sermon.speaker}
              </Text>
              <Text className="line-clamp-2" color="text-neutral-400">
                {sermon.description}
              </Text>
            </View>
          </Pressable>
        ))}
        <Button
          icon="plus"
          onPress={() =>
            Linking.openURL(
              "https://form.asana.com/?k=6Fi7azqcPDAZ3LUOgbt14w&d=1128054213135307"
            )
          }
          variant="text"
        >
          Submit a Sermon
        </Button>
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
