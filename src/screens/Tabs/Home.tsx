import React from "react";
import { useWindowDimensions } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from "react-native-tab-view";
import ThemeText from "~/components/ThemeText";
import TimelineContainer from "~/components/Timeline/TimelineContainer";
import { calculateTabIndicatorWidth } from "~/utils/helpers";
import { useTheme } from "~/utils/theme/ThemeManager";

const Route = ({ route: { queryKey } }: { route: any }) => (
  <TimelineContainer {...{ queryKey }} />
);

const renderScene = SceneMap({
  first: Route,
  second: Route,
});

const HomeTab = () => {
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Missing", queryKey: "Missing" },
    { key: "second", title: "Report", queryKey: "Found" },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{ backgroundColor: colors.textWhite }}
      renderIndicator={(indicatorProps) => {
        const singleTabWidth = indicatorProps.getTabWidth(index);

        const { left, tabWidth } = calculateTabIndicatorWidth({
          singleTabWidth,
          numberOfTabs: 2,
        });

        return (
          <TabBarIndicator
            {...indicatorProps}
            width={tabWidth}
            style={{ left: left, backgroundColor: colors.primary }}
          />
        );
      }}
      renderLabel={({ route, focused }) => (
        <ThemeText
          color={focused ? colors.primary : colors.textSecondary}
          style={{
            textTransform: "uppercase",
          }}
        >
          {route.title}
        </ThemeText>
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
