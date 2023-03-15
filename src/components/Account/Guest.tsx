import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";

const Guest = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  return (
    <View style={styles.root}>
      <Image
        source={require("assets/images/pet_sentry_banner.png")}
        style={{
          width: "100%",
          height: 200,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={styles.content}>
          <ThemeText
            fontWeight="Medium"
            color={"#fff"}
            style={{ fontSize: 30 }}
          >
            Welcome to
          </ThemeText>
          <ThemeText
            fontWeight="Medium"
            style={{ fontSize: 30 }}
            color={"#fff"}
          >
            Pet Sentry
          </ThemeText>

          <ThemeText
            color={"#fff"}
            style={{ marginTop: StyleConstants.Spacing.S }}
          >
            Pet Sentry helps reunite lost pets with their families. Keep your
            furry friends safe with Pet Sentry.
          </ThemeText>
        </View>

        <View style={{ flex: 1 }}>
          <Pressable
            style={{
              backgroundColor: "#fff",
              borderRadius: 100,
              paddingVertical: StyleConstants.Spacing.S + 4,
              alignItems: "center",
              marginBottom: StyleConstants.Spacing.M,
            }}
          >
            <ThemeText color={colors.primary} fontWeight={"Medium"}>
              Join now
            </ThemeText>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeText color={"#fff"}>Already a member? </ThemeText>
            <Pressable onPress={() => navigation.navigate("Login-Screen")}>
              <ThemeText color={"#fff"}>Log in</ThemeText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#469387",
  },
  container: {
    flex: 1,
    padding: StyleConstants.Spacing.M,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Guest;
