import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Text as BaseText } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import lentDailyData from "../../data/lentFinalOutput.json";
import { decodeVerseId } from "@/utils/bible";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import { getCurrentDayOfLent } from "@/utils/notifications";
import { useMemo } from "react";

export default function TodayTab() {
  const todayDate = new Date();
  const currentDayOfLent = useMemo(
    () => getCurrentDayOfLent(todayDate),
    [todayDate]
  );
  const todayLentData = lentDailyData[currentDayOfLent];
  const bibleStart = decodeVerseId(todayLentData.bibleStart);
  const bibleEnd = decodeVerseId(todayLentData.bibleEnd);

  return (
    <SafeAreaView>
      <ScrollView className="pb-72">
        <View className="flex flex-col gap-2 p-16 bg-neutral-900 items-center m-4 rounded-lg">
          <Text className="uppercase" color="text-neutral-500" size="text-base">
            Lent day ({currentDayOfLent + 1} of 50)
          </Text>
          <Text className="font-black" color="text-white" size="text-4xl">
            {todayLentData.theme}
          </Text>
        </View>

        <Card title="Overview" description={todayLentData.shortExplanation} />
        <Card
          title={`Today's Reading (${bibleStart.bookKey} ${bibleStart.chapter}:${bibleStart.verse}-${bibleEnd.verse})`}
        >
          <BaseText style={{ lineHeight: 100 }}>
            {todayLentData.verses.map((verse, index) => (
              <Text key={index} color="text-neutral-200" size="text-2xl">
                <BaseText
                  style={{ color: TailwindColorsHexCodes.neutral[600] }}
                >
                  {verse.verse.verseNum}
                </BaseText>{" "}
                {verse.verse.verseText}{" "}
              </Text>
            ))}
          </BaseText>
        </Card>
        <Card
          title="Practical Application"
          description={todayLentData.practice}
        />

        <Card title="Deep Dive" description={todayLentData.longExplanation} />
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
    <View className="flex flex-col gap-2 border-b border-neutral-800 px-4 py-8">
      <Text className="uppercase" color="text-neutral-500" size="text-base">
        {title}
      </Text>
      {description && (
        <Text color="text-neutral-200" size="text-2xl">
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};
