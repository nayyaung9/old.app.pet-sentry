import React from "react";
import { StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const TimelineInReview = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <ThemeText color={"#fff"}>
        You'r post is in review. The moderators will check and verify soon.
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flex: 1,
    // marginTop: StyleConstants.Spacing.S,
    marginBottom: StyleConstants.Spacing.M,
    padding: StyleConstants.Spacing.S,
    borderRadius: 4,
  },
});

export default TimelineInReview;
