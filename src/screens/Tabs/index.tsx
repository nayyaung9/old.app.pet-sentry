import React from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Tab Screens
import HomeTab from "./Home";
import ComposeTab from "./Compose";

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
              onPress={() => navigation.navigate("Cart-Screen")}
            >
              <Feather name="shopping-cart" size={22} color="black" />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Tab-Catelog"
        component={ComposeTab}
        options={() => ({
          title: "Category",
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore1" size={24} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ScreenTab;
