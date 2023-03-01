import React from "react";
import { StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const Accouncement = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <ThemeText fontWeight="Medium" fontStyle="L">
        My Annoucements
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: StyleConstants.Spacing.M,
    marginTop: StyleConstants.Spacing.M,
  },
});

export default Accouncement;
