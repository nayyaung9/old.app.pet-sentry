import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ComponentSeparator from "../Sperator";
import TimelineCard from "./TimelineCard";
import TimelineEmpty from "./TimelineEmpty";
import TimelineError from "./TimelineError";
import TimelineMenuRoot from "./Menu/Root";
import ThemeModal from "../ThemeModal";
import Loading from "../Loading";

// Utils & Queries
import { usePosts } from "~/libs/query/post";
import { useTimelineState, useTimelineStore } from "~/utils/state/timeline";
import { useTheme } from "~/utils/theme/ThemeManager";

const TimelineContainer = ({ queryKey }: { queryKey: string }) => {
  const { colors } = useTheme();
  const { isLoading, data, error } = usePosts({ activityType: queryKey });
  const { statusMenu } = useTimelineState();
  const { onToggleStatusMenu } = useTimelineStore();

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <TimelineError />
      ) : (
        <>
          {Array.isArray(data) && !error && (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              style={{ flex: 1, backgroundColor: colors.textWhite }}
              ItemSeparatorComponent={ComponentSeparator}
              ListEmptyComponent={TimelineEmpty}
              renderItem={({ item, index }) => (
                <TimelineCard {...{ item, index }} />
              )}
            />
          )}
        </>
      )}

      {/* We control Timeline Status Menu with Global State */}
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
});
export default TimelineContainer;
