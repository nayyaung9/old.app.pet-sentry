import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import ComponentSeparator from "~/components/Sperator";
import MenuIconButton from "./MenuIconButton";
import { showMessage } from "react-native-flash-message";

import { useAuthState } from "~/utils/state/useAuth";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";
import { StyleConstants } from "~/utils/theme/constants";
import { useTimelineState, useTimelineStore } from "~/utils/state/timeline";
import { usePostDeleteMutation } from "~/libs/mutation/post";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import type { RootStackScreenProps } from "~/@types/navigators";

const TimelineMenuRoot = () => {
  const navigation =
    useNavigation<RootStackScreenProps<"App-Screens">["navigation"]>();
  const { userId } = useAuthState();
  const { colors } = useTheme();
  const { selectedInfo } = useTimelineState();
  const { onToggleStatusMenu } = useTimelineStore();
  const queryClient = useQueryClient();

  const isCurrentUserAnOwner = selectedInfo?.ownerId == userId;

  const deleteMutation = usePostDeleteMutation({
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries(["Owner-Posts"]);
        queryClient.invalidateQueries([
          "Posts",
          { activityType: res?.activityType },
        ]);
        showMessage({
          message: "Post Delete",
          description: "Your post is deleted!",
          type: "success",
        });
        onToggleStatusMenu();
        navigation.goBack();
      }
    },
    onError: () => {
      showMessage({
        message: "Post Delete",
        description: "Your post is not delete. Please try again later.",
        type: "danger",
      });
    },
  });

  const onDeletePost = (id: string) => deleteMutation.mutate({ postId: id });

  const onEditPost = (id: string) => {
    onToggleStatusMenu();
    navigation.navigate("Pet-Edit-Root", { postId: id });
  };

  return (
    <View style={styles.timelineStatusMenu}>
      {isCurrentUserAnOwner && Object.keys(selectedInfo).length >= 1 && (
        <View>
          <MenuIconButton
            onPress={() => console.log("AAA")}
            icon={
              <FontAwesome5
                name="hand-holding-heart"
                size={24}
                color={colors.mediumDark}
              />
            }
            title="Set pet as Reunited"
            helperText="This will let everyone know you've meet your pet"
            containerStyle={styles.menuItem}
          />
          <ComponentSeparator />

          <MenuIconButton
            icon={<Feather name="edit-3" size={24} color={colors.mediumDark} />}
            title="Edit"
            helperText="Edit your pet's information, missing place & photos."
            containerStyle={styles.menuItem}
            onPress={() => onEditPost(selectedInfo?.postId as string)}
          />
          <ComponentSeparator />

          <MenuIconButton
            icon={
              <MaterialCommunityIcons
                name="delete-empty"
                size={24}
                color={colors.mediumDark}
              />
            }
            title="Delete"
            containerStyle={styles.menuItem}
            onPress={() => onDeletePost(selectedInfo?.postId as string)}
          />
          <ComponentSeparator />
        </View>
      )}

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
        containerStyle={styles.menuItem}
        onPress={() => null}
      />
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
    paddingHorizontal: StyleConstants.Spacing.M,
  },
});
export default TimelineMenuRoot;
