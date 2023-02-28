import React from "react";
import { Text, View, useWindowDimensions, Dimensions } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from "react-native-tab-view";
import TimelineContainer from "~/components/Timeline/TimelineContainer";

const DEVICE = Dimensions.get("window");

const Route = ({ route: { queryKey } }: { route: any }) => {
  return <TimelineContainer {...{ queryKey }} />;
};
const renderScene = SceneMap({
  first: Route,
  second: Route,
});

const HomeTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Missing", queryKey: "Missing" },
    { key: "second", title: "Report", queryKey: "Found" },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{ backgroundColor: "#fff" }}
      renderIndicator={(indicatorProps) => {
        const singleTabWidth = indicatorProps.getTabWidth(index);
        const numberOfTabs = 2;
        const widthOfIndicator = 40;
        const spaingLeftExtra = widthOfIndicator / 2;

        const spaingTab =
          DEVICE.width / numberOfTabs -
          singleTabWidth / numberOfTabs -
          spaingLeftExtra;
        return (
          <TabBarIndicator
            {...indicatorProps}
            width={widthOfIndicator}
            style={{ left: spaingTab, backgroundColor: "#ff4081" }}
          />
        );
      }}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            textTransform: "uppercase",
            color: focused ? "#ff4081" : "#555",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default HomeTab;
