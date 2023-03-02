import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();
import type { RootStackParamList } from "~/@types/navigators";

// Screens
import AppDrawerStack from "./Drawer";
import TimelineDetail from "~/screens/TimelineDetail";
import Map from "~/screens/Map/Root";
import PetLostForm from "~/screens/Compose/PetLostForm";
import { useTheme } from "~/utils/theme/ThemeManager";

const ApplicationNavigator = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="App-Screens"
          component={AppDrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Timeline-Detail" component={TimelineDetail} />
        <Stack.Screen
          name="Map-Screen"
          component={Map}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pet-Lost-Screen"
          component={PetLostForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
