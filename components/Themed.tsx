/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { classNames } from "@/utils/style";
import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";

import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = "dark"; //useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(
  props: TextProps & {
    fontSize?:
      | "text-xs"
      | "text-sm"
      | "text-base"
      | "text-lg"
      | "text-xl"
      | "text-[10px]";
  }
) {
  const {
    style,
    lightColor,
    darkColor,
    className: classNameOriginal,
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const className = classNames(props.fontSize, classNameOriginal);

  return (
    <DefaultText style={[{ color }]} className={className} {...otherProps} />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
