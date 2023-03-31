import React from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";
import ComponentSeparator from "~/components/Sperator";
import ThemeText from "~/components/ThemeText";
import MenuIconButton from "~/components/Timeline/Menu/MenuIconButton";
import { useMe } from "~/libs/query/user";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Button from "~/components/Button";
import { useAuthStore } from "~/utils/state/useAuth";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

type drawerMenusProps = {
  label: string;
  icon: React.ReactNode;
  route: string;
};
const drawerMenus = [
  {
    label: "Profile",
    icon: <Ionicons name="person" size={24} color="#555" />,
    route: "Tab-Profile",
  },
  {
    label: "About Project",
    icon: <FontAwesome name="question" size={24} color="#555" />,
    route: "Tab-Profile",
  },
];

const AccountDrawer = () => {
  const { data } = useMe();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  const onLogout = () => {
    logout();
    showMessage({
      message: "Logout Success!",
      type: "info",
    });
  };

  return (
    <>
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

        <Pressable style={styles.profileInfoContainer}>
          <ThemeText>Hello</ThemeText>
          <ThemeText fontWeight="Medium" color={colors.mediumDark}>
            {data?.user?.name}
          </ThemeText>
        </Pressable>
      </View>

      <ComponentSeparator color={colors.inputBackground} />

      <View style={styles.profileMenuContainer}>
        {drawerMenus.map((menuItem: drawerMenusProps, index) => (
          <MenuIconButton
            key={index}
            icon={menuItem?.icon}
            title={menuItem?.label}
            onPress={() => navigation.navigate(menuItem?.route)}
            containerStyle={styles.menuItem}
          />
        ))}

        <View style={styles.logoutContainer}>
          <Button onPress={onLogout}>
            <ThemeText color={"#fff"}>Logout</ThemeText>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: StyleConstants.Spacing.M,
  },
  profileInfoContainer: {
    flexDirection: "column",
    marginLeft: StyleConstants.Spacing.S,
    paddingBottom: StyleConstants.Spacing.M,
  },
  profileMenuContainer: {
    flex: 1,
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingVertical: StyleConstants.Spacing.M,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 100,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: StyleConstants.Spacing.M,
  },
});

export default AccountDrawer;
