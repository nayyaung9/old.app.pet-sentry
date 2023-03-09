import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import ThemeText from "../ThemeText";

const TimelineEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require("assets/images/no-record.png")}
        style={styles.emptyImage}
      />
      <ThemeText
        fontStyle={"L"}
        fontWeight={"Medium"}
        color={"#364663"}
        style={{
          textAlign: "center",
        }}
      >
        Good News! We have no reported pets now.
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: StyleConstants.Spacing.L,
  },
  emptyImage: {
    width: 80,
    height: 80,
    marginBottom: StyleConstants.Spacing.M,
  },
});

export default TimelineEmpty;
