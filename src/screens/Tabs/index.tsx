import React from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator<BottomTabScreenParamList>();

// Tab Screens
import HomeTab from "./Home";
import ComposeTab from "./Compose";
import { BottomTabScreenParamList } from "~/@types/navigators";

const ScreenTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tab-Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="Tab-Home"
        component={HomeTab}
        options={({ navigation }) => ({
          title: "Pet Sentry",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pets" size={24} color={color} />
          ),
          headerLeft: () => (
            <Pressable style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate("Map-Screen")}
            >
              <Ionicons name="map" size={24} color="#555" />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Tab-Compose"
        component={ComposeTab}
        options={() => ({
          title: "Compose",
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore1" size={24} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ScreenTab;
