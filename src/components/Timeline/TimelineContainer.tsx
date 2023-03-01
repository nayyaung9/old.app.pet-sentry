import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ComponentSeparator from "../Sperator";
import TimelineCard from "./TimelineCard";
import { Flow } from "react-native-animated-spinkit";
import TimelineEmpty from "./TimelineEmpty";

// Utils & Queries
import { useTheme } from "~/utils/theme/ThemeManager";
import { usePosts } from "~/libs/query/post";

const TimelineContainer = ({ queryKey }: { queryKey: string }) => {
  const { colors } = useTheme();
  const { isLoading, data, error } = usePosts({ activityType: queryKey });
  return (
    <View style={styles.root}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Flow size={48} color={colors.primary} />
        </View>
      ) : (
        <>
          {Array.isArray(data) && !error && (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
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
