import { classNames } from "@/utils/style";
import { Text, View } from "./Themed";
import { Pressable, PressableProps } from "react-native";
import { TailwindColorsHexCodes, TextColor } from "@/types/tailwind.types";
import { FontAwesome } from "@expo/vector-icons";

const Button = ({
  children,
  className,
  variant = "primary",
  icon,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
  icon?: keyof typeof FontAwesome.glyphMap;
} & PressableProps) => {
  const variantClassName = {
    primary: "bg-rose-600",
    secondary: "border border-rose-600",
    text: "",
  }[variant];

  const variantTextColor: TextColor = {
    primary: "text-white" as TextColor,
    secondary: "text-rose-600" as TextColor,
    text: "text-neutral-500" as TextColor,
  }[variant];

  const variantTextClassName = {
    primary: "font-semibold",
    secondary: "",
    text: "",
  }[variant];

  const iconColor = {
    primary: "white" as TextColor,
    secondary: TailwindColorsHexCodes.rose[600] as TextColor,
    text: TailwindColorsHexCodes.neutral[500] as TextColor,
  }[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      {...rest}
    >
      <View
        className={classNames(
          "rounded-md flex items-center py-4 px-8",
          variantClassName,
          className
        )}
      >
        <FontAwesome name={icon} color={variantTextColor} />
        <Text
          color={variantTextColor}
          className={variantTextClassName}
          size="text-lg"
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
