import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Accouncement from "~/components/Account/Announcement";
import Guest from "~/components/Account/Guest";
import AccountRoot from "~/components/Account/Root";
import { getAuthToken } from "~/utils/storage";

const ProfileTab = () => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const prepare = async () => {
    setLoading(true);
    const isTokenExist = await getAuthToken();
    if (isTokenExist) {
      setIsAuth(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    prepare();
  }, []);

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
