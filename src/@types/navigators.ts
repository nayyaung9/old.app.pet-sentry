import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";
import type { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerStackParamsList = {
  "Screen-Tabs": NavigatorScreenParams<BottomTabScreenParamList>;
};
export type DrawerStackScreenProps<T extends keyof DrawerStackParamsList> =
  DrawerScreenProps<DrawerStackParamsList, T>;

export type RootStackParamList = {
  "App-Screens": NavigatorScreenParams<DrawerStackParamsList>;
  "Timeline-Detail": {
    postId: string;
  };
  "Map-Screen": {
    isPin: boolean;
    point: {
      latitude?: number;
      longitude?: number;
    };
  };
  "Pet-Lost-Screen": undefined;
  "Profile-Setting": undefined;

  "Login-Screen": undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type BottomTabScreenParamList = {
  "Tab-Home": undefined;
  "Tab-Compose": undefined;
  "Tab-Profile": undefined;
};

export type BottomTabsScreenProps<T extends keyof BottomTabScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabScreenParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
