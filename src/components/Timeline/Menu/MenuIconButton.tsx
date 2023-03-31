import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import ThemeText from "~/components/ThemeText";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";

const MenuIconButton = ({
  icon,
  title,
  helperText,
  onPress,
  containerStyle,
}: {
  icon: React.ReactNode;
  title: string;
  helperText?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.menuIconButtonContainer, containerStyle]}
      onPress={onPress}
    >
      <View
        style={{
          width: 24,
          height: 24,
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuIconButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: StyleConstants.Spacing.S - 2,
    paddingHorizontal: StyleConstants.Spacing.S - 4,
  },
});

export default MenuIconButton;
