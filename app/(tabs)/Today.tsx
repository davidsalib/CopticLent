import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { SafeAreaView, ScrollView } from "react-native";
import lentDailyData from "../data/lentFinalOutput.json";
import { decodeVerseId } from "@/utils/bible";

const FIRST_DAY_OF_LENT = new Date("2025-02-24T00:00:00-08:00");

export default function TodayTab() {
  const todayDate = new Date();
  const currentDayOfLent = Math.floor(
    (todayDate.getTime() - FIRST_DAY_OF_LENT.getTime()) / (1000 * 60 * 60 * 24)
  );
  const todayLentData = lentDailyData[currentDayOfLent];
  const bibleStart = decodeVerseId(todayLentData.bibleStart);
  const bibleEnd = decodeVerseId(todayLentData.bibleEnd);

  return (
    <SafeAreaView>
      <View className="flex flex-col gap-2 px-4 pt-8 pb-4">
        <Text className="uppercase" color="text-neutral-500" size="text-base">
          Lent day ({currentDayOfLent + 1} of 50)
        </Text>
        <Text className="font-black" color="text-white" size="text-4xl">
          {todayLentData.theme}
        </Text>
      </View>
      <ScrollView className="pb-72">
        <View className="flex flex-col gap-8">
          <Card title="Overview" description={todayLentData.shortExplanation} />
          <Card
            title="Practical Application"
            description={todayLentData.practice}
          />
          <Card
            title={`Today's Reading (${bibleStart.bookKey} ${bibleStart.chapter}:${bibleStart.verse}-${bibleEnd.verse})`}
          >
            <Text>
              {todayLentData.verses.map((verse, index) => (
                <Text key={index} color="text-neutral-200" size="text-lg">
                  <Text color="text-neutral-400">{verse.verse.verseNum}</Text>{" "}
                  {verse.verse.verseText}{" "}
                </Text>
              ))}
            </Text>
          </Card>
          <Card title="Deep Dive" description={todayLentData.longExplanation} />
        </View>
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
