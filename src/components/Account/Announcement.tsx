import moment from "moment";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useOwnerPosts } from "~/libs/query/post";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ComponentSeparator from "../Sperator";
import ThemeText from "../ThemeText";
import TimelineCard from "../Timeline/TimelineCard";

const Accouncement = () => {
  const { colors } = useTheme();
  const { data, isLoading } = useOwnerPosts();

  console.log("data", JSON.stringify(data, null, 2))
  return (
    <View style={styles.root}>
      {isLoading ? (
        <ThemeText>Loading...</ThemeText>
      ) : (
        <View>
          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: StyleConstants.Spacing.S,
                  paddingHorizontal: StyleConstants.Spacing.M,
                }}
              >
                <ThemeText fontWeight="Medium" fontStyle="L">
                  My Annoucements
                </ThemeText>
                <ThemeText color={colors.primary}>See more</ThemeText>
              </View>
            }
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ComponentSeparator}
            data={data}
            renderItem={({ item }) => (
              <TimelineCard {...{ item, isHideOwner: true }} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: StyleConstants.Spacing.M,
  },
  postCardItem: {
    marginBottom: StyleConstants.Spacing.M,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  timelineImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
});

export default Accouncement;
