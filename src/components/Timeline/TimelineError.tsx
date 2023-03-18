import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";

const TimelineError = () => {
  return (
    <View style={styles.errorContainer}>
      <ThemeText>There was an error. Please try again later.</ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TimelineError;
