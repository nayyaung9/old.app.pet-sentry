import React from "react";
import { Pressable, View } from "react-native";
import ThemeText from "~/components/ThemeText";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

import type { BottomTabScreenParamList } from "~/@types/navigators";
const Tab = createBottomTabNavigator<BottomTabScreenParamList>();

// Tab Screens
import HomeTab from "./Home";
import ComposeTab from "./Compose";
import ProfileTab from "./Profile";

// Utils
import { useGeoAddress, useUserCoordinates } from "~/utils/state/useGeoAddress";
import { useTheme } from "~/utils/theme/ThemeManager";

const ScreenTab = () => {
  const { colors } = useTheme();
  const geoAddress = useGeoAddress();
  const userCoordinates = useUserCoordinates();

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
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <ThemeText fontStyle={"L"} fontWeight={"Medium"}>
                Pet Sentry
              </ThemeText>
              {geoAddress != "" && (
                <ThemeText fontStyle="S" fontWeight="Light">
                  {geoAddress}
                </ThemeText>
              )}
            </View>
          ),

          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="pets"
              size={24}
              color={focused ? colors.primary : color}
            />
          ),
          headerLeft: () => (
            <Pressable style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={{ marginRight: 16 }}
              onPress={() =>
                navigation.navigate("Map-Screen", {
                  isPin: false,
                  point: {
                    latitude: userCoordinates?.latitude,
                    longitude: userCoordinates?.longitude,
                  },
                })
              }
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
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="appstore1"
              size={24}
              color={focused ? colors.primary : color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Tab-Profile"
        component={ProfileTab}
        options={() => ({
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? colors.primary : color}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ScreenTab;
