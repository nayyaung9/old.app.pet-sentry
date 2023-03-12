import React from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import Accouncement from "~/components/Account/Announcement";
import Guest from "~/components/Account/Guest";
import AccountRoot from "~/components/Account/Root";
import { useAuthState } from "~/utils/state/useAuth";
import ComponentSeparator from "~/components/Sperator";
import TimelineCard from "~/components/Timeline/TimelineCard";

const ProfileTab = () => {
  const { token } = useAuthState();

  return (
    <View style={styles.root}>
      {!token ? (
        <Guest />
      ) : (
        <>
          <ScrollView>
            <AccountRoot />
            <Accouncement />
          </ScrollView>
          {/* <FlatList
            ListHeaderComponent={}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ComponentSeparator}
            data={data}
            renderItem={({ item }) => (
              <TimelineCard {...{ item, isHideOwner: true }} />
            )}
          /> */}
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
