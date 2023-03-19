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
} from "react-native";
import { FONT_FAMILY, StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "./ThemeText";

type InputProps = {
  as?: "textarea";
  label?: string;
  errorText?: string | any;
} & TextInputProps;

const INPUT_HEIGHT = 50;

const Input: React.FC<InputProps> = ({
  label,
  as,
  placeholder,
  onFocus,
  onBlur,
  errorText,
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

  const iOSPaddingTopStyleCalculate = useMemo(() => {
    if (label) {
      return isInputTextarea
        ? StyleConstants.Spacing.L
        : StyleConstants.Spacing.M;
    }
    return 0;
  }, [label, isInputTextarea]);

  const androidPaddingTop = useMemo(() => {
    return StyleConstants.Spacing.L;
  }, [placeholder, isInputTextarea]);

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={isInputTextarea ? true : false}
          style={[
            styles.input,
            {
              height: INPUT_HEIGHT,
              paddingTop: Platform.select({
                android: androidPaddingTop,
                ios: iOSPaddingTopStyleCalculate,
              }),
              backgroundColor: colors.inputBackground,
              fontFamily: "Font-Regular",
              fontSize: !rest.value ? 12 : 14,
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
      </View>
      {errorText && (
        <View style={{ marginTop: StyleConstants.Spacing.S - 6 }}>
          <ThemeText color={colors.errorText} fontStyle={"S"}>
            {errorText}
          </ThemeText>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderRadius: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: StyleConstants.Spacing.M,
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
    height: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default Input;
