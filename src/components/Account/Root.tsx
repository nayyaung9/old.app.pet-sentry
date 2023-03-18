import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";

// Utils
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useMe } from "~/libs/query/user";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "~/@types/navigators";

const AccountRoot = () => {
  const navigation =
    useNavigation<RootStackScreenProps<"Profile-Setting">["navigation"]>();
  const { colors } = useTheme();
  const { data } = useMe();

  const onNavigateToMyProfile = () =>
    navigation.navigate("Profile-Root", { name: data?.name as string });

  return (
    <Pressable style={styles.root} onPress={onNavigateToMyProfile}>
      {data?.profileUrl ? (
        <Image source={{ uri: data?.profileUrl }} style={styles.profileImage} />
      ) : (
        <Image
          source={require("assets/images/default_avatar.png")}
          style={styles.profileImage}
        />
      )}

      <View style={styles.profileInfo}>
        <ThemeText fontStyle="L" fontWeight="Medium">
          {data?.name}
        </ThemeText>
        <ThemeText fontStyle="S" color={colors.textSecondary}>
          Tap to view your profile
        </ThemeText>
      </View>
    </Pressable>
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
