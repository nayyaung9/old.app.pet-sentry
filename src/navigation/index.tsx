import React from "react";
import { Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();
import { RootStackParamList } from "~/@types/navigators";

// Screens
import ScreenTabs from "~/screens/Tabs";
import TimelineDetail from "~/screens/TimelineDetail";
import Map from "~/screens/Map";

const ApplicationNavigator = () => {
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
        <Stack.Screen
          name="Timeline-Detail"
          component={TimelineDetail}
          options={({ navigation, route }) => ({
            title: route?.params?.data?.petName,
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable>
                <Ionicons name="md-bookmark-outline" size={24} color="black" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Map-Screen"
          component={Map}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
