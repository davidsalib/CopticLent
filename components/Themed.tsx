/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { classNames } from "@/utils/style";
import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";

import { FontSize, TextColor } from "@/types/tailwind.types";

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
  props: TextProps & { color?: TextColor; size?: FontSize }
) {
  const {
    style,
    lightColor,
    darkColor,
    className: classNameOriginal,
    color = "text-white",
    size = "text-base",
    ...otherProps
  } = props;
  const className = classNames(color, size, classNameOriginal);

  return <DefaultText className={className} style={style} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, className, ...otherProps } = props;

  return <DefaultView className={className} style={style} {...otherProps} />;
}
