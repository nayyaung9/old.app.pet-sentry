import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import ThemeText from "./ThemeText";

type LabelProps = {
  containerStyle?: StyleProp<ViewStyle>;
  leftComponent?: React.ReactElement;
  label: string;
  value: string;
};

const Label: React.FC<LabelProps> = ({
  containerStyle,
  label,
  value,
  leftComponent,
}) => {
  return (
    <View style={[styles.labelContainer, containerStyle]}>
      <View style={styles.labelWithAction}>
        <ThemeText color={"#000"} fontStyle={"M"} fontWeight={"Medium"}>
          {label}
        </ThemeText>
        {leftComponent}
      </View>

      <ThemeText color={"#555"} fontStyle={"S"}>
        {value}
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "column",
    marginBottom: StyleConstants.Spacing.M,
  },
  labelWithAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Label;
