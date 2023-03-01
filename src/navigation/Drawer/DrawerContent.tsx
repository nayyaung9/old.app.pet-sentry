import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { useTheme } from "~/utils/theme/ThemeManager";
import { StyleConstants } from "~/utils/theme/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "~/@types/navigators";

const drawerMenus = [
  {
    label: "Profile",
  },
  {
    label: "Topics",
  },
  {
    label: "Bookmarks",
  },
];

const DrawerContent = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "App-Screens">>();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 4,
      }}
    >
      <View style={styles.root}>
        <View
          style={[
            styles.profileContainer,
            {
              paddingHorizontal: StyleConstants.Spacing.M,
            },
          ]}
        >
          <View
            style={{
              backgroundColor: "#f00",
              width: 38,
              height: 38,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeText>DS</ThemeText>
          </View>
          <Pressable
            style={{
              flexDirection: "column",
              marginLeft: StyleConstants.Spacing.S,
            }}
          >
            <ThemeText fontStyle="HeadingBoldSmall">Hello</ThemeText>
            <ThemeText fontStyle="Small" color={colors.textInfo}>
              @iwashere
            </ThemeText>
          </Pressable>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/* <Image
              source={require("assets/images/profile/theme.png")}
              style={[styles.icon, { marginRight: StyleConstants.Spacing.M }]}
            />
            <Image
              source={require("assets/images/profile/add_account.png")}
              style={styles.icon}
            /> */}
          </View>
        </View>

        <View
          style={[
            styles.profileContainer,
            {
              justifyContent: "space-between",
              paddingHorizontal: StyleConstants.Spacing.M,
              marginTop: StyleConstants.Spacing.M,
              marginBottom: StyleConstants.Spacing.S,
              paddingVertical: StyleConstants.Spacing.M,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: colors.buttonDisabled,
              borderBottomColor: colors.buttonDisabled,
            },
          ]}
        >
          <View style={styles.profileContainer}>
            <ThemeText fontStyle="SegmentSemiBold">2 204 </ThemeText>
            <ThemeText fontStyle="Caption" color={colors.textInfo}>
              Following
            </ThemeText>
          </View>
          <View style={styles.profileContainer}>
            <ThemeText fontStyle="SegmentSemiBold">709,3K </ThemeText>
            <ThemeText fontStyle="Caption" color={colors.textInfo}>
              Followers
            </ThemeText>
          </View>
        </View>

        {/* Drawer Menus Here */}
        <View
          style={{
            paddingHorizontal: StyleConstants.Spacing.M,
          }}
        >
          {drawerMenus.map((menuItem, index) => (
            <View key={index} style={styles.menuItem}>
              {/* <Image
                source={menuItem.icon}
                style={[styles.icon, { marginRight: StyleConstants.Spacing.S }]}
              /> */}
              <ThemeText fontStyle="SegmentSemiBold">
                {menuItem.label}
              </ThemeText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StyleConstants.Spacing.S,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: StyleConstants.Spacing.M,
  },
});

export default DrawerContent;
