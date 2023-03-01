import React from "react";
import { StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const Guest = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <ThemeText>Please Login or Register.</ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
});

export default Guest;
