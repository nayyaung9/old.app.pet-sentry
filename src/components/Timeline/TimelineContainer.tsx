import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ComponentSeparator from "../Sperator";
import TimelineCard from "./TimelineCard";
import TimelineEmpty from "./TimelineEmpty";
import TimelineError from "./TimelineError";
import TimelineMenuRoot from "./Menu/Root";
import ThemeModal from "../ThemeModal";
import Loading from "../Loading";
import Button from "../Button";
import ThemeText from "../ThemeText";

// Utils & Queries
import { usePosts } from "~/libs/query/post";
import { useTimelineState, useTimelineStore } from "~/utils/state/timeline";
import { useTheme } from "~/utils/theme/ThemeManager";
import { StyleConstants } from "~/utils/theme/constants";
import { useNavigation } from "@react-navigation/native";

const TimelineContainer = ({ queryKey }: { queryKey: string }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { isLoading, data, error } = usePosts({ activityType: queryKey });
  const { statusMenu, filteringModal } = useTimelineState();
  const { onToggleStatusMenu, onToggleFilteringModal } = useTimelineStore();

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

      <ThemeModal
        isFlex
        openThemeModal={filteringModal}
        onCloseThemeModal={onToggleFilteringModal}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemeText
            fontStyle={"L"}
            fontWeight={"Medium"}
            style={{
              marginHorizontal: StyleConstants.Spacing.XL,
              textAlign: "center",
            }}
          >
            Filtering feature will be available in next version.
          </ThemeText>
          <Button style={styles.closeButton} onPress={onToggleFilteringModal}>
            <ThemeText color={"#fff"}>Close</ThemeText>
          </Button>
        </View>
      </ThemeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  closeButton: {
    marginTop: StyleConstants.Spacing.M,
  },
});
export default TimelineContainer;
