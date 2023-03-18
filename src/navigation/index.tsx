import React from "react";
import { Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Screens
import AppDrawerStack from "./Drawer";
import TimelineDetail from "~/screens/Timeline/Detail";
import Map from "~/screens/Map/Root";
import PetLostForm from "~/screens/Compose/PetLostForm";
import PetReportForm from "~/screens/Compose/PetReportForm";
import ProfileRoot from "~/screens/Profile/Root";
import ProfileSetting from "~/screens/Profile/Edit";
import Login from "~/screens/Authentication/Login";
import PetEditRoot from "~/screens/Compose/Edit/Root";

import type { RootStackParamList } from "~/@types/navigators";

const ApplicationNavigator = () => {
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
          name="Pet-Report-Screen"
          component={PetReportForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pet-Edit-Root"
          component={PetEditRoot}
          options={({ navigation }) => ({
            title: "Edit Post",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#555" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Profile-Setting"
          component={ProfileSetting}
          options={({ navigation }) => ({
            title: "Edit Your Profile",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#555" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Profile-Root"
          component={ProfileRoot}
          options={({ route, navigation }) => ({
            title: route?.params?.name,
            headerTitleAlign: "left",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#555" />
              </Pressable>
            ),
          })}
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
