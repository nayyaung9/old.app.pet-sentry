import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Utils
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useTimelineStore } from "~/utils/state/timeline";

type OwnerProps = {
  ownerId: string;
  profileUrl: string;
  name: string;
  systemedShortAddress: string | null;
};
type TimelineOwnerProps = {
  postId: string;
  owner: OwnerProps;
};

const TimelineOwner = ({
  postId,
  owner: { profileUrl, name, systemedShortAddress, ownerId },
}: TimelineOwnerProps) => {
  const { onToggleStatusMenu, setPostInfoForModal } = useTimelineStore();
  const { colors } = useTheme();

  const onMakeActionStatusModal = () => {
    onToggleStatusMenu();

    setPostInfoForModal({ postId: postId, ownerId });
  };

  return (
    <View style={styles.infoRoot}>
      {profileUrl ? (
        <Image
          source={{ uri: profileUrl }}
          style={{ width: 42, height: 42, borderRadius: 100 }}
        />
      ) : (
        <Image
          source={require("assets/images/default_avatar.png")}
          style={{ width: 42, height: 42, borderRadius: 100 }}
        />
      )}

      <View style={styles.infoContent}>
        <ThemeText fontWeight="Medium" style={styles.authorName}>
          {name}
        </ThemeText>
        {systemedShortAddress && (
          <View style={styles.infoLocationRow}>
            <Ionicons name="md-location" size={14} color={colors.mediumDark} />

            <ThemeText
              fontStyle={"XS"}
              fontWeight={"Medium"}
              color={colors.mediumDark}
            >
              {systemedShortAddress}
            </ThemeText>
          </View>
        )}
      </View>
      <View style={styles.infoMenuRoot}>
        <Pressable onPress={onMakeActionStatusModal}>
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
