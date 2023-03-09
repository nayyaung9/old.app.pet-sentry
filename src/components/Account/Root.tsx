import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";

// Utils
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useMe } from "~/libs/query/user";

const AccountRoot = () => {
  const { colors } = useTheme();
  const { data } = useMe();
  return (
    <View style={styles.root}>
      <Image source={{ uri: data?.profileUrl }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <ThemeText fontStyle="L" fontWeight="Medium">
          {data?.name}
        </ThemeText>
        <ThemeText fontStyle="S" color={colors.textSecondary}>
          {data?.email}
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
