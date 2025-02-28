import { classNames } from "@/utils/style";
import { Text, View } from "./Themed";
import { Pressable, PressableProps } from "react-native";
import { TextColor } from "@/types/tailwind.types";

const CustomPressable = ({
  children,
  className,
  variant = "primary",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
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

export default CustomPressable;
