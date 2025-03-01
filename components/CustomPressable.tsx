import { Pressable, PressableProps } from "react-native";

const CustomPressable = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & PressableProps) => {
  return (
    <Pressable
      className={className}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export default CustomPressable;
