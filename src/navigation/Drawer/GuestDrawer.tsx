import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import ComponentSeparator from "~/components/Sperator";
import { StyleConstants } from "~/utils/theme/constants";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "~/@types/navigators";
import MenuIconButton from "~/components/Timeline/Menu/MenuIconButton";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const GuestDrawer = () => {
  const navigation =
    useNavigation<RootStackScreenProps<"App-Screens">["navigation"]>();

  return (
    <>
      <Image
        source={require("assets/images/pet_sentry_banner.png")}
        resizeMode={"contain"}
        style={{
          width: "100%",
          height: 200,
        }}
      />

      <MenuIconButton
        title={"Login"}
        icon={<MaterialCommunityIcons name="login" size={24} color="black" />}
        containerStyle={styles.menuItem}
        onPress={() => navigation.navigate("Login-Screen")}
      />
      <ComponentSeparator />

      <MenuIconButton
        title={"Register"}
        icon={<AntDesign name="adduser" size={24} color="black" />}
        containerStyle={styles.menuItem}
        onPress={() => navigation.navigate("Login-Screen")}
      />
      <ComponentSeparator />
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: StyleConstants.Spacing.S,
    paddingVertical: StyleConstants.Spacing.M,
  },
});
export default GuestDrawer;
