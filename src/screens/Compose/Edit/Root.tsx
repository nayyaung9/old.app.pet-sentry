import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { StyleConstants } from "~/utils/theme/constants";
import ComponentSeparator from "~/components/Sperator";
import MenuIconButton from "~/components/Timeline/Menu/MenuIconButton";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const PetEditRoot = () => {
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="#fff" style={"dark"} />
      <View style={styles.menuRoot}>
        <MenuIconButton
          icon={<MaterialIcons name="pets" size={24} color="#555" />}
          title="Edit Pet's Basic Information"
          helperText="Include your pet name, gender & so on."
          containerStyle={styles.menuItem}
          onPress={() => null}
        />
        <ComponentSeparator />

        <MenuIconButton
          icon={<MaterialIcons name="place" size={24} color="#555" />}
          title="Edit Missing Information"
          helperText="Including missing place, lost date & address."
          containerStyle={styles.menuItem}
          onPress={() => null}
        />
        <ComponentSeparator />

        <MenuIconButton
          icon={
            <MaterialCommunityIcons name="identifier" size={24} color="#555" />
          }
          title="Edit Pet's Identification"
          helperText="Including collar color & special traits."
          containerStyle={styles.menuItem}
          onPress={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: StyleConstants.Spacing.M,
  },
  menuRoot: {
    borderWidth: 1,
    borderColor: "#f0f2f5",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  menuItem: {
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingVertical: StyleConstants.Spacing.M,
  },
});
export default PetEditRoot;
