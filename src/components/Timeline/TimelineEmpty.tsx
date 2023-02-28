import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";

const TimelineEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <ThemeText>Currently, We have no report pets.</ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimelineEmpty;
