import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "~/utils/theme/ThemeManager";

type ProgressBarType = {
  stepCounts: number;
  activeStep: number;
};

const ProgressBar = ({ stepCounts, activeStep }: ProgressBarType) => {
  const { colors } = useTheme();

  return (
    <View style={styles.progressBarWrapper}>
      {Array(stepCounts)
        .fill(stepCounts)
        .map((_, barIndex) => {
          const isCurrentStepProgressed = activeStep >= barIndex + 1;
          return (
            <View
              key={barIndex}
              style={{
                height: 4,
                borderRadius: 100,
                backgroundColor: isCurrentStepProgressed
                  ? colors.primary
                  : "#f0f2f5",
                width: 100 / stepCounts - 1 + "%",
              }}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
export default ProgressBar;
