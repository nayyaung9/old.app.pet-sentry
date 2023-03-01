import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Utils
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";

type OwnerProps = {
  profileUrl: string;
  name: string;
};
type TimelineOwnerProps = {
  postId: string;
  owner: OwnerProps;
};

const TimelineOwner = ({
  postId,
  owner: { profileUrl, name },
}: TimelineOwnerProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.infoRoot}>
      <Image
        source={{ uri: profileUrl }}
        style={{ width: 42, height: 42, borderRadius: 100 }}
      />
      <View style={styles.infoContent}>
        <ThemeText fontWeight="Medium" style={styles.authorName}>
          {name}
        </ThemeText>
        <View style={styles.infoLocationRow}>
          <Ionicons name="md-location" size={14} color={colors.mediumDark} />
          <ThemeText
            fontStyle={"XS"}
            fontWeight={"Medium"}
            color={colors.mediumDark}
          >
            Tarmwe, Yangon
          </ThemeText>
        </View>
      </View>
      <View style={styles.infoMenuRoot}>
        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRoot: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: StyleConstants.Spacing.M,
  },
  infoContent: {
    marginLeft: StyleConstants.Spacing.S,
  },
  authorName: {
    marginBottom: StyleConstants.Spacing.S - 5,
  },
  infoLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -StyleConstants.Spacing.S + 6,
  },
  infoMenuRoot: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default TimelineOwner;
