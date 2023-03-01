import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Accouncement from "~/components/Account/Announcement";
import Guest from "~/components/Account/Guest";
import AccountRoot from "~/components/Account/Root";
import ThemeText from "~/components/ThemeText";

const ProfileTab = () => {
  const isAuth = true;
  return (
    <View style={styles.root}>
      {!isAuth ? (
        <Guest />
      ) : (
        <>
          <AccountRoot />
          <Accouncement />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default ProfileTab;
