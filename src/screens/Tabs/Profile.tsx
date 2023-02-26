import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileTab = () => {
  return (
    <View style={styles.root}>
      <Text>Profile</Text>
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
