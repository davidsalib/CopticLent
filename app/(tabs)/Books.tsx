import { Text, View } from "@/components/Themed";
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import booksData from "../../data/books.json";
import Button from "@/components/Button";
import { classNames } from "@/utils/style";
import { useRouter } from "expo-router";


const bookThumbnailMap: Record<string, any> = {
  AH_ITS: require("../../data/book_thumbnails/AH_ITS.png"),
  AR_FA: require("../../data/book_thumbnails/AR_FA.png"),
  AY_FKI: require("../../data/book_thumbnails/AY_FKI.png"),
  BP_MAB: require("../../data/book_thumbnails/BP_MAB.png"),
  BW_HHP: require("../../data/book_thumbnails/BW_HHP.png"),
  CJ_JC: require("../../data/book_thumbnails/CJ_JC.png"),
  CL_FMP: require("../../data/book_thumbnails/CL_FMP.png"),
  DG_DG: require("../../data/book_thumbnails/DG_DG.png"),
  DI_HHP: require("../../data/book_thumbnails/DI_HHP.png"),
  FDF_FDF: require("../../data/book_thumbnails/FDF_FDF.png"),
  JT_EG: require("../../data/book_thumbnails/JT_EG.png"),
  LA_STA: require("../../data/book_thumbnails/LA_STA.png"),
  LBG_JS: require("../../data/book_thumbnails/LBG_JS.png"),
  LJS_MM: require("../../data/book_thumbnails/LJS_MM.png"),
  LPK_PKV: require("../../data/book_thumbnails/LPK_PKV.png"),
  MS_SM: require("../../data/book_thumbnails/MS_SM.png"),
  OPL_FMP: require("../../data/book_thumbnails/OPL_FMP.png"),
  PS_BYG: require("../../data/book_thumbnails/PS_BYG.png"),
  PS_FAI: require("../../data/book_thumbnails/PS_FAI.png"),
  RE_FMP: require("../../data/book_thumbnails/RE_FMP.png"),
  RP_HHP: require("../../data/book_thumbnails/RP_HHP.png"),
  RS_HHP: require("../../data/book_thumbnails/RS_HHP.png"),
  SL_TTR: require("../../data/book_thumbnails/SL_TTR.png"),
  SP_FDF: require("../../data/book_thumbnails/SP_FDF.png"),
  SW_HHP: require("../../data/book_thumbnails/SW_HHP.png"),
  US_LOA: require("../../data/book_thumbnails/US_LOA.png"),
  UW_TTR: require("../../data/book_thumbnails/UW_TTR.png"),
  WA_TC: require("../../data/book_thumbnails/WA_TC.png"),
  WL_FMP: require("../../data/book_thumbnails/WL_FMP.png"),
};

export default function BooksTab() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex flex-col gap-2 px-4 pt-8 pb-4">
        <Text className="font-black" size="text-4xl">
          Books
        </Text>
      </View>
      <ScrollView contentContainerClassName="flex flex-col items-center gap-8 pb-36">
        <View className="flex flex-row flex-wrap px-4">
          {booksData.map((book, index) => {
            const isAmazonBook = book.url.indexOf("amazon") >= 0;
            return (
              <Pressable
                key={index}
                className="w-1/2 p-2"
                onPress={() =>{
                    if (!isAmazonBook) {
                        router.push({
                          pathname: "/WebViewScreen",
                          params: { url: book.url, title: book.title },
                        });
                      } else {
                        Linking.openURL(book.url).catch((err) => console.error(err));
                      }
                }}
              >
                <View className="flex items-center justify-center gap-4 p-4 rounded-lg bg-neutral-900">
                  <Image
                    source={bookThumbnailMap[book.id]}
                    className="object-contain w-32 h-48 rounded-md"
                  />
                  <Text className="font-semibold text-center" size="text-lg">
                    {book.title}
                  </Text>
                  <Text
                    color={
                      isAmazonBook ? "text-orange-200" : "text-neutral-400"
                    }
                    className={classNames(
                      "p-2 rounded-md uppercase",
                      isAmazonBook ? "bg-orange-400/50" : "bg-neutral-800"
                    )}
                    size="text-xs"
                  >
                    {isAmazonBook ? "Amazon" : "Free"}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <Button
          icon="plus"
          onPress={() =>
            Linking.openURL(
              "https://form.asana.com/?k=JV7LbecfPrW6OL8B60BbUg&d=1128054213135307"
            )
          }
          variant="text"
        >
          Submit a Book
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
    <View className="flex flex-col gap-2 px-4 pt-4 border-t border-neutral-800">
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
