import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { StyleConstants } from "~/utils/theme/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "~/@types/navigators";
import { useAuthState } from "~/utils/state/useAuth";
import ComponentSeparator from "~/components/Sperator";
import AccountDrawer from "./AccountDrawer";
import GuestDrawer from "./GuestDrawer";

const DrawerContent = () => {
  const insets = useSafeAreaInsets();
  const { token } = useAuthState();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.root}>
        {!token ? <GuestDrawer /> : <AccountDrawer />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StyleConstants.Spacing.S,
  },
});

export default DrawerContent;
