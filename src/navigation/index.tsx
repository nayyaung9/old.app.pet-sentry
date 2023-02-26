import React from "react";
import { Pressable, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();
import { RootStackParamList } from "~/@types/navigators";

// Screens
import ScreenTabs from "~/screens/Tabs";
import TimelineDetail from "~/screens/TimelineDetail";
import Map from "~/screens/Map/Root";
import PetLostForm from "~/screens/Compose/PetLostForm";
import { StyleConstants } from "~/utils/theme/constants";

const ApplicationNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Screen-Tabs"
          component={ScreenTabs}
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
          options={({ navigation, route }) => ({
            title: "Lost Pet",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
