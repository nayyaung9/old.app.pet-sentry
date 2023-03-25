import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ThemeText from "../ThemeText";
import ComponentSeparator from "../Sperator";

// Utils
import moment from "moment";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useMe } from "~/libs/query/user";
import { useNavigation } from "@react-navigation/native";
import { useGeoAddress } from "~/utils/state/useGeoAddress";
import type { RootStackScreenProps } from "~/@types/navigators";

const AccountRoot = () => {
  const navigation =
    useNavigation<RootStackScreenProps<"Profile-Setting">["navigation"]>();
  const { colors } = useTheme();
  const { data } = useMe();
  const geoAddress = useGeoAddress();

  return (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        {data?.user?.profileUrl ? (
          <Image
            source={{ uri: data?.user?.profileUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("assets/images/default_avatar.png")}
            style={styles.profileImage}
          />
        )}

        <View style={styles.profileInfo}>
          <ThemeText fontStyle="L" fontWeight="Medium">
            {data?.user?.name}
          </ThemeText>
        </View>
      </View>
      <View style={styles.profileMetaContainer}>
        <View style={styles.profileMetaView}>
          <ThemeText color={colors.textSecondary} fontStyle={"S"}>
            Posts
          </ThemeText>
          <ThemeText fontStyle={"S"}>{data?.postCount}</ThemeText>
        </View>
        <View style={[styles.profileMetaView, { alignItems: "center" }]}>
          <ThemeText color={colors.textSecondary} fontStyle={"S"}>
            Joined Date
          </ThemeText>
          <ThemeText fontStyle={"S"}>
            {moment(data?.user?.createdAt).format("MMM DD")}
          </ThemeText>
        </View>
        <View style={[styles.profileMetaView, { alignItems: "flex-end" }]}>
          <ThemeText color={colors.textSecondary} fontStyle={"S"}>
            Location
          </ThemeText>
          <ThemeText fontStyle={"S"}>{geoAddress}</ThemeText>
        </View>
      </View>

      <ComponentSeparator color={colors.inactiveTabBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: StyleConstants.Spacing.M,
  },
  profileContainer: {
    paddingHorizontal: StyleConstants.Spacing.M,
    alignItems: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  profileInfo: {
    paddingTop: StyleConstants.Spacing.S,
    paddingBottom: StyleConstants.Spacing.M,
  },
  profileMetaContainer: {
    flexDirection: "row",
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingBottom: StyleConstants.Spacing.S,
  },
  profileMetaView: {
    flex: 1,
  },
});

export default AccountRoot;
