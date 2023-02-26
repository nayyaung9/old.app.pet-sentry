import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Image,
  Pressable,
} from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import ThemeText from "./ThemeText";
import { Feather, Ionicons } from "@expo/vector-icons";

type OwnerInfoProps = {
  containerStyle?: StyleProp<ViewStyle>;
  value?: string;
};

const OwnerInfo: React.FC<OwnerInfoProps> = ({ containerStyle, value }) => {
  return (
    <View style={[styles.labelContainer, containerStyle]}>
      <ThemeText color={"#000"} fontStyle={"M"} fontWeight={"Medium"}>
        Owner Info
      </ThemeText>
      <View style={styles.ownerInfoContainer}>
        <View style={styles.infoRow}>
          <Image
            source={{
              uri: "https://avatars.githubusercontent.com/u/45455924?v=4",
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: StyleConstants.Spacing.S }}>
            <ThemeText color={"#000"} fontStyle={"S"} fontWeight={"Medium"}>
              Nay Yaung Lin Lakk
            </ThemeText>
            <ThemeText color={"#555"} fontStyle={"S"}>
              (+95) 9 79770 5667
            </ThemeText>
          </View>
          <View style={styles.profileActionContainer}>
            <Pressable style={{ marginRight: StyleConstants.Spacing.M }}>
              <Feather name="phone-outgoing" size={22} color="black" />
            </Pressable>
            <Pressable>
              <Ionicons name="chatbubbles-outline" size={22} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "column",
    marginBottom: StyleConstants.Spacing.M,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  ownerInfoContainer: {
    marginTop: StyleConstants.Spacing.S,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileActionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default OwnerInfo;
