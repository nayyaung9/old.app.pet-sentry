import React from "react";
import { StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const TimelineReunited = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.reunitedView,
        {
          backgroundColor: colors.notifyView,
        },
      ]}
    >
      <ThemeText fontWeight="Medium" color={colors.textGreen}>
        The pet has been reunited.
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  reunitedView: {
    width: "100%",
    height: 42,
    borderRadius: 10,
    marginTop: StyleConstants.Spacing.M - 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TimelineReunited;
