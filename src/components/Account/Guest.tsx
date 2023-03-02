import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const Guest = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  return (
    <View style={styles.root}>
      <ThemeText>Please Login or Register.</ThemeText>

      <Pressable onPress={() => navigation.navigate("Login-Screen")}>
        <ThemeText>Login</ThemeText>
      </Pressable>

      <Pressable>
        <ThemeText>Register</ThemeText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Guest;
