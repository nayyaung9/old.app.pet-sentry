import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const ComponentSeparator: React.FC<Props> = ({
  containerStyle,
  style,
  color,
}) => {
  return (
    <View
      style={[
        style,
        containerStyle,
        {
          backgroundColor: color || "#F3F6FF",
          borderTopColor: color || "#F3F6FF",
          borderTopWidth: 1,
        },
      ]}
    />
  );
};

export default ComponentSeparator;
