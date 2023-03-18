import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import ScreenTabs from "~/screens/Tabs";
import { DrawerStackParamsList } from "~/@types/navigators";
import DrawerContent from "./Root";

const Drawer = createDrawerNavigator<DrawerStackParamsList>();

const DEVICE = Dimensions.get("window");

function AppDrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: DEVICE.width - 92,
        },
      }}
    >
      <Drawer.Screen name="Screen-Tabs" component={ScreenTabs} />
    </Drawer.Navigator>
  );
}

export default AppDrawerStack;
