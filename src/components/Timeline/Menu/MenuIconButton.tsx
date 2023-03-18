import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";

const MenuIconButton = ({
  icon,
  title,
  helperText,
}: {
  icon: React.ReactElement;
  title: string;
  helperText?: string;
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.menuIconButtonContainer}>
      <View
        style={{
          marginRight: StyleConstants.Spacing.S,
        }}
      >
        {icon}
      </View>
      <View style={{ paddingLeft: StyleConstants.Spacing.S }}>
        <ThemeText color={colors.mediumDark} fontStyle={"M"}>
          {title}
        </ThemeText>
        {helperText && (
          <ThemeText color={colors.textSecondary} fontStyle={"S"}>
            {helperText}
          </ThemeText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuIconButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: StyleConstants.Spacing.S - 2,
    paddingHorizontal: StyleConstants.Spacing.S - 4,
  },
});

export default MenuIconButton;
