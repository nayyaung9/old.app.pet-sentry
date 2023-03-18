import React from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import ComponentSeparator from "~/components/Sperator";
import MenuIconButton from "./MenuIconButton";

import { useAuthState } from "~/utils/state/useAuth";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";
import { StyleConstants } from "~/utils/theme/constants";

const TimelineMenuRoot = () => {
  const { userId } = useAuthState();
  const { colors } = useTheme();
  // const isCurrentUserAnOwner = ownerId == userId;

  return (
    <View style={styles.timelineStatusMenu}>
      {true && (
        <View>
          <Pressable style={styles.menuItem}>
            <MenuIconButton
              icon={
                <FontAwesome5
                  name="hand-holding-heart"
                  size={24}
                  color={colors.mediumDark}
                />
              }
              title="Set pet as Reunited"
              helperText="This will let everyone know you've meet your pet"
            />
          </Pressable>
          <ComponentSeparator />
          <Pressable style={styles.menuItem}>
            <MenuIconButton
              icon={
                <Feather name="edit-3" size={24} color={colors.mediumDark} />
              }
              title="Edit"
              helperText="Edit your pet's information, missing place & photos."
            />
          </Pressable>
          <ComponentSeparator />
          <Pressable
            style={styles.menuItem}
            // onPress={() => onDeletePost(data?._id as string)}
          >
            <MenuIconButton
              icon={
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={24}
                  color={colors.mediumDark}
                />
              }
              title="Delete"
              helperText="Deleting your pet"
            />
          </Pressable>
          <ComponentSeparator />
        </View>
      )}
      <Pressable style={styles.menuItem}>
        <MenuIconButton
          icon={
            <FontAwesome5
              name="hands-helping"
              size={24}
              color={colors.mediumDark}
            />
          }
          title="Share on social media"
          helperText="You're a value contributor"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineStatusMenu: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: Platform.select({ ios: StyleConstants.Spacing.M }),
  },
  menuItem: {
    paddingVertical: StyleConstants.Spacing.S,
  },
});
export default TimelineMenuRoot;
