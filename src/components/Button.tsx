import React from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { Flow } from "react-native-animated-spinkit";

type ButtonProps = {
  disabled?: boolean;
  borderRadius?: number;
  loading?: boolean;

  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  borderRadius,
  loading,
  style: customStyle,
  onPress,
}) => {
  const { colors } = useTheme();

  const renderMainColor = () => {
    if (disabled) {
      return colors.buttonDisable;
    }

    return colors.primary;
  };

  const loadingIndicator = () => {
    return loading && <Flow size={30} color={colors.primary} />;
  };

  const renderChildren = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {loadingIndicator()}
        {!loading && (
          <>
            <View style={{ marginLeft: StyleConstants.Spacing.S }} />
            {children}
          </>
        )}
      </View>
    );
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pressableButton,
        {
          borderRadius: borderRadius || 50,
          backgroundColor: renderMainColor(),
        },
        customStyle,
      ]}
      children={renderChildren}
    />
  );
};

const styles = StyleSheet.create({
  pressableButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 50,
    marginBottom: StyleConstants.Spacing.M,
  },
});

export default Button;
