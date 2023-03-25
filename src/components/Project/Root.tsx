import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";
import { Ionicons } from "@expo/vector-icons";
import ComponentSeparator from "../Sperator";

import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";

const ProjectRoot = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <ThemeText fontWeight="Medium">About Project</ThemeText>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
      <ComponentSeparator color={colors.inactiveTabBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: StyleConstants.Spacing.S,
    paddingHorizontal: StyleConstants.Spacing.M,
  },
});
export default ProjectRoot;
