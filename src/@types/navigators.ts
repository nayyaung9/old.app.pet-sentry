import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  "Screen-Tabs": NavigatorScreenParams<BottomTabScreenParamList>;
  "Timeline-Detail": {
    data: any;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type BottomTabScreenParamList = {
  "Tab-Home": undefined;
  "Tab-Compose": undefined;
};

export type BottomTabsScreenProps<T extends keyof BottomTabScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabScreenParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
