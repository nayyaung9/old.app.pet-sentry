import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";
import { StyleConstants } from "~/utils/theme/constants";
import ComponentSeparator from "../Sperator";
import { useAuthState } from "~/utils/state/useAuth";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const MenuIconButton = ({ icon, title }: { icon: any; title: string }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.menuIconButtonContainer}>
      <View
        style={{
          marginRight: StyleConstants.Spacing.S,
        }}
      >
        {icon}
      </View>
      <ThemeText color={colors.textSecondary} fontStyle={"S"}>
        {title}
      </ThemeText>
    </View>
  );
};

type TimelineStatusMenuProps = {
  isVisible: boolean;
  hideMenu: () => void;
  showMenu: () => void;
  ownerId: string;
  postId: string;
};
const TimelineMenu = ({
  isVisible,
  showMenu,
  hideMenu,
  ownerId,
  postId,
}: TimelineStatusMenuProps) => {
  const { colors } = useTheme();
  const { userId } = useAuthState();

  const isCurrentUserAnOwner = ownerId == userId;

  return (
    <Menu opened={isVisible} onBackdropPress={hideMenu}>
      <MenuTrigger>
        <Pressable onPress={showMenu}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </Pressable>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.menuContainer}
        customStyles={{
          optionsContainer: {
            borderRadius: 12,
          },
        }}
      >
        {isCurrentUserAnOwner && (
          <>
            <MenuOption onSelect={() => console.log("Save")}>
              <MenuIconButton
                icon={<Feather name="edit-3" size={24} color="black" />}
                title="Edit"
              />
            </MenuOption>
            <ComponentSeparator />
            <MenuOption onSelect={() => console.log("Delete")}>
              <MenuIconButton
                icon={
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={24}
                    color="black"
                  />
                }
                title="Delete"
              />
            </MenuOption>
            <ComponentSeparator />
          </>
        )}

        <MenuOption onSelect={() => console.log("Delete")}>
          <MenuIconButton
            icon={<Feather name="share" size={24} color="black" />}
            title="Share on Social Media"
          />
        </MenuOption>
        <ComponentSeparator />
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuIconButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: StyleConstants.Spacing.S - 2,
    paddingHorizontal: StyleConstants.Spacing.S - 4,
  },
  menuContainer: {
    width: 250,
    borderRadius: 12,
  },
});
export default TimelineMenu;
