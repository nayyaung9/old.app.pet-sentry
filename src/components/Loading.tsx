import React from "react";
import { StyleSheet, View } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import { useTheme } from "~/utils/theme/ThemeManager";

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <Flow size={48} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Loading;
