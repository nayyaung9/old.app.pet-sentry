import React from "react";
import { View } from "react-native";
import Button from "~/components/Button";
import ThemeText from "~/components/ThemeText";
import { useAuthStore } from "~/utils/state/useAuth";

const ProfileSetting = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <View>
      <ThemeText>Profile Setting</ThemeText>
      <Button onPress={logout}>
        <ThemeText color={"#fff"}>Logout</ThemeText>
      </Button>
    </View>
  );
};

export default ProfileSetting;
