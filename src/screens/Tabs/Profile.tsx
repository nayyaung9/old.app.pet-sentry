import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Accouncement from "~/components/Account/Announcement";
import Guest from "~/components/Account/Guest";
import AccountRoot from "~/components/Account/Root";
import ProjectRoot from "~/components/Project/Root";
import { useAuthState } from "~/utils/state/useAuth";

const ProfileTab = () => {
  const { token } = useAuthState();

  return (
    <View style={styles.root}>
      {!token ? (
        <Guest />
      ) : (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AccountRoot />
            <ProjectRoot />
            <Accouncement />
          </ScrollView>
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
