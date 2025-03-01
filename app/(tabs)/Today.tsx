import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Text as BaseText, Share } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import lentDailyData from "../../data/lentFinalOutput.json";
import { decodeVerseId } from "@/utils/bible";
import { TailwindColorsHexCodes } from "@/types/tailwind.types";
import { getCurrentDayOfLent } from "@/utils/notifications";
import { useMemo } from "react";
import {
  useAcceptedAIGeneratedContent,
  useAppSettingActions,
} from "@/stores/AppStore";
import Button from "@/components/Button";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function TodayTab() {
  const hasAcceptedAIGeneratedContent = useAcceptedAIGeneratedContent();
  const appSettignActions = useAppSettingActions();
  const todayDate = new Date();
  const currentDayOfLent = useMemo(
    () => getCurrentDayOfLent(todayDate),
    [todayDate]
  );
  const todayLentData = lentDailyData[currentDayOfLent];
  const bibleStart = decodeVerseId(todayLentData.bibleStart);
  const bibleEnd = decodeVerseId(todayLentData.bibleEnd);

  const AIGeneratedContent = (
    <>
      <View className="flex items-center gap-4 flex-row justify-center p-4 bg-neutral-900 rounded-md mt-4 mx-4">
        <Text className="uppercase" color="text-neutral-500" size="text-base">
          Experimental AI Insights
        </Text>
      </View>
      <Card
        title="Overview"
        description={todayLentData.shortExplanation}
        isAIGeneratedContent={true}
      />
      <Card
        title="Practical Application"
        description={todayLentData.practice}
        isAIGeneratedContent={true}
      />

      <Card
        title="Deep Dive"
        description={todayLentData.longExplanation}
        isAIGeneratedContent={true}
      />
    </>
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName="pb-24">
        <View className="bg-neutral-900 m-4 rounded-lg">
          <Button
            icon="share-square-o"
            className="absolute top-2 -right-2"
            variant="text"
            onPress={() =>
              Share.share({
                message: `"${todayLentData.fatherQuoteText}"\n\n- ${todayLentData.fatherQuoteName}`,
              })
            }
          />
          <View className="flex flex-col gap-2 p-12 items-center">
            <Text
              className="uppercase"
              color="text-neutral-500"
              size="text-base"
            >
              Day {currentDayOfLent + 1} of Lent
            </Text>
            <Text className="font-black" color="text-white" size="text-4xl">
              {todayLentData.theme}
            </Text>
            <Text
              color="text-neutral-300"
              size="text-base"
              className="text-center"
            >
              "{todayLentData.fatherQuoteText}"
            </Text>
            <Text
              color="text-neutral-500"
              size="text-base"
              className="text-center"
            >
              {todayLentData.fatherQuoteName}
            </Text>
          </View>
        </View>

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
        {hasAcceptedAIGeneratedContent ? (
          AIGeneratedContent
        ) : (
          <View className="bg-neutral-900 p-8 rounded-md m-4 gap-4 flex flex-col items-center">
            <View className="flex gap-2">
              <View className="flex justify-center items-center flex-row gap-2">
                <FontAwesome
                  name="magic"
                  size={16}
                  color={TailwindColorsHexCodes.neutral[500]}
                />
                <Text
                  className="uppercase"
                  color="text-neutral-400"
                  size="text-sm"
                >
                  Experimental
                </Text>
              </View>
              <Text size="text-2xl" className="font-bold">
                Lenten Patristic Insights
              </Text>
            </View>
            <Text className="text-center">
              Coptic Lent App uses commentaries from the Church Fathers along
              with Open AI's most advanced O1-Reasoning Model to summarize the
              Church Father's insights on the theme and scripture of the day.
            </Text>
            <Text className="text-center">
              However, this is an experimental feature and AI *is expected* to
              make mistakes. By accessing AI summaries, you accept that
              summaries are not authoritative and that primary sources should be
              referenced and take precedence in the case of any discrepancies.
            </Text>
            <Button
              onPress={() =>
                appSettignActions.setAcceptedAIGeneratedContent(true)
              }
            >
              View AI Generated Summaries
            </Button>
          </View>
        )}
        <Text
          className="text-center m-4 max-w-xs w-full self-center flex-1"
          color="text-neutral-400"
        >
          That's it for today. May Christ's light shine within you and to all
          those around you.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const Card = ({
  title,
  description,
  children,
  isAIGeneratedContent,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  isAIGeneratedContent?: boolean;
}) => {
  return (
    <View className="flex flex-col gap-2 border-b border-neutral-800 px-4 py-8">
      <View className="flex flex-row gap-2 items-center">
        {isAIGeneratedContent && (
          <FontAwesome
            name="magic"
            size={16}
            color={TailwindColorsHexCodes.neutral[500]}
          />
        )}
        <Text className="uppercase" color="text-neutral-500" size="text-base">
          {title}
        </Text>
      </View>
      {description && (
        <Text color="text-neutral-200" size="text-2xl">
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};
