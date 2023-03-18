import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ComponentSeparator from "../Sperator";
import TimelineCard from "./TimelineCard";
import { Flow } from "react-native-animated-spinkit";
import TimelineEmpty from "./TimelineEmpty";

// Utils & Queries
import { useTheme } from "~/utils/theme/ThemeManager";
import { usePosts } from "~/libs/query/post";
import ThemeText from "../ThemeText";
import TimelineMenuRoot from "./Menu/Root";
import { useTimelineState, useTimelineStore } from "~/utils/state/timeline";
import ThemeModal from "../ThemeModal";

const TimelineContainer = ({ queryKey }: { queryKey: string }) => {
  const { colors } = useTheme();
  const { isLoading, data, error } = usePosts({ activityType: queryKey });
  const { statusMenu } = useTimelineState();
  const { onToggleStatusMenu } = useTimelineStore();

  return (
    <View style={styles.root}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Flow size={48} color={colors.primary} />
        </View>
      ) : error ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ThemeText>There was an error. Please try again later.</ThemeText>
        </View>
      ) : (
        <>
          {Array.isArray(data) && !error && (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              style={{ flex: 1, backgroundColor: "#fff" }}
              ItemSeparatorComponent={ComponentSeparator}
              data={data}
              ListEmptyComponent={TimelineEmpty}
              renderItem={({ item, index }) => (
                <TimelineCard {...{ item, index }} />
              )}
            />
          )}
        </>
      )}
      <ThemeModal
        openThemeModal={statusMenu}
        onCloseThemeModal={onToggleStatusMenu}
        parentPaddingEnabled={false}
      >
        <TimelineMenuRoot />
      </ThemeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TimelineContainer;
