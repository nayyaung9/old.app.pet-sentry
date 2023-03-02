import React from "react";
import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleConstants } from "~/utils/theme/constants";
import ThemeText from "./ThemeText";

type HeaderProps = {
  title?: string;
  containerStyle?: CustomStyleProp;
  leftComponentStyle?: CustomStyleProp;
  rightComponentStyle?: CustomStyleProp;
  leftCustomComponent?: React.ReactElement;
  rightCustomComponent?: React.ReactElement;
};

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

const AppBar = ({
  title,
  containerStyle,
  leftCustomComponent,
  rightCustomComponent,
  rightComponentStyle,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          // View Safe Area for status bar
          backgroundColor: "#fff",
          ...Platform.select({
            android: {
              paddingTop: insets.top + StyleConstants.Spacing.S,
            },
            ios: {
              paddingTop: insets.top,
            },
          }),
        },
      ]}
    >
      <View style={[styles.container, containerStyle]}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
        {leftCustomComponent && (
          <View style={styles.leftComponentStyle}>{leftCustomComponent}</View>
        )}

        {title && (
          <ThemeText
            fontStyle="L"
            style={{ alignSelf: "center", textAlign: "center" }}
          >
            {title}
          </ThemeText>
        )}
        {rightCustomComponent && (
          <View style={[styles.rightComponentStyle, rightComponentStyle]}>
            {rightCustomComponent}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  leftComponentStyle: {
    left: 16,
    position: "absolute",
  },
  rightComponentStyle: {
    right: 16,
    position: "absolute",
  },
});
export default AppBar;
