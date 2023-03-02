import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  TextInputProps,
  Easing,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FONT_FAMILY, StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "./ThemeText";

type InputProps = {
  as?: "textarea";
  label?: string;
  disabled?: boolean;
  errorText?: string | any;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement | null;
} & TextInputProps;

const INPUT_HEIGHT = 50;

const InputAdornment: React.FC<InputProps> = ({
  label,
  as,
  placeholder,
  onFocus,
  disabled,
  onBlur,
  errorText,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(event);
      setFocused(true);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(event);
      setFocused(false);
    },
    [onBlur]
  );

  const focusAnimation = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(focusAnimation, {
      toValue: focused ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const active = useMemo(
    () => focused || (rest.value?.length || 0) > 0,
    [focused, rest.value]
  );

  const activeAnimation = useMemo(() => new Animated.Value(active ? 1 : 0), []);

  useEffect(() => {
    Animated.timing(activeAnimation, {
      toValue: active ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [active]);

  const labelAnimationStyle = {
    fontSize: activeAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    transform: [
      {
        translateY: activeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  const isInputTextarea = as == "textarea";

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={isInputTextarea ? true : false}
          style={[
            styles.input,
            {
              paddingTop: Platform.select({
                android: !placeholder
                  ? StyleConstants.Spacing.M
                  : isInputTextarea
                  ? StyleConstants.Spacing.M
                  : 0,
                ios: label || isInputTextarea ? StyleConstants.Spacing.M : 0,
              }),
              height: isInputTextarea ? 200 : INPUT_HEIGHT,
              backgroundColor: colors.inputBackground,
              paddingLeft: startAdornment
                ? StyleConstants.Spacing.M + (24 + 8)
                : StyleConstants.Spacing.M,
              paddingRight: endAdornment
                ? StyleConstants.Spacing.M + (24 + 8)
                : StyleConstants.Spacing.M,
            },
          ]}
          autoCapitalize="none"
          textAlignVertical={isInputTextarea ? "top" : "center"}
          selectionColor={colors.primary}
          placeholderTextColor={colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCorrect={false}
          autoComplete={"off"}
          placeholder={
            label ? (focused ? placeholder : undefined) : placeholder
          }
          {...rest}
        />

        {/* Handling Label Component Here */}
        {label && (
          <View style={styles.labelContainer} pointerEvents="none">
            <Animated.Text
              style={[
                labelAnimationStyle,
                {
                  color: colors.textSecondary,
                  fontFamily: FONT_FAMILY.REGULAR,
                },
              ]}
            >
              {label}
            </Animated.Text>
          </View>
        )}

        <Animated.View
          style={[
            styles.underlineFocused,
            {
              backgroundColor: colors.primary,
              transform: [{ scaleX: focusAnimation }],
            },
          ]}
          pointerEvents="none"
        />

        {/* Managing Start and End Adornment Icons Here */}
        {startAdornment && (
          <View style={styles.startAdornmentView}>{startAdornment}</View>
        )}

        {endAdornment && (
          <View style={styles.endAdornmentView}>{endAdornment}</View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    borderRadius: 4,
    zIndex: 1,
  },
  labelContainer: {
    justifyContent: "center",
    position: "absolute",
    top: 0,
    paddingHorizontal: 16,
    height: INPUT_HEIGHT,
    zIndex: 1,
  },
  underlineFocused: {
    position: "absolute",
    start: 0,
    end: 0,
    bottom: -1.5,
    height: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputSuccess: {
    position: "absolute",
    zIndex: 1,
    right: 18,
    top: 14,
  },
  startAdornmentView: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    top: 8,
  },
  endAdornmentView: {
    position: "absolute",
    right: 16,
    zIndex: 1,
    top: 15,
  },
});

export default InputAdornment;
