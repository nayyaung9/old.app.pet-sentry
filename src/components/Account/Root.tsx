import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const AccountRoot = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <Image
        source={{ uri: "https://avatars.githubusercontent.com/u/45455924?v=4" }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <ThemeText fontStyle="L" fontWeight="Medium">
          Nay Yaung Lin Lakk
        </ThemeText>
        <ThemeText fontStyle="S" color={colors.textSecondary}>
          nayyaung.developer@gmail.com
        </ThemeText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: StyleConstants.Spacing.M,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  profileInfo: {
    marginLeft: StyleConstants.Spacing.S,
  },
});

export default AccountRoot;
