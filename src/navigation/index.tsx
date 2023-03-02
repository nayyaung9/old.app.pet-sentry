import React from "react";
import { Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "~/utils/theme/ThemeManager";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();
import type { RootStackParamList } from "~/@types/navigators";

// Screens
import AppDrawerStack from "./Drawer";
import TimelineDetail from "~/screens/TimelineDetail";
import Map from "~/screens/Map/Root";
import PetLostForm from "~/screens/Compose/PetLostForm";
import ProfileSetting from "~/screens/Profile/Setting";
import Login from "~/screens/Authentication/Login";

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
        <Stack.Screen
          name="Profile-Setting"
          component={ProfileSetting}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login-Screen"
          component={Login}
          options={({ navigation }) => ({
            title: "Login",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#555" />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
