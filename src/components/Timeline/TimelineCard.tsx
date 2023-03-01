import React, { memo } from "react";

// Components
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import ThemeText from "~/components/ThemeText";

// Utils & Queries
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabsScreenProps } from "~/@types/navigators";
import { StyleConstants } from "~/utils/theme/constants";
import TimelineOwner from "./TimelineOwner";

const TimelineCard = ({ item }: { item: PetSentry.Post }) => {
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Home">["navigation"]>();

  return (
    <TouchableOpacity activeOpacity={1} style={styles.timelineCard}>
      <TimelineOwner
        {...{
          postId: item?._id,
          owner: {
            profileUrl: item?._owner?.profileUrl,
            name: item?._owner?.name,
          },
        }}
      />

      {Array.isArray(item?.photos) && item?.photos?.length >= 1 && (
        <Pressable
          onPress={() =>
            navigation.navigate("Timeline-Detail", { postId: item?._id })
          }
        >
          <Image
            source={{
              uri: item.photos[0].url,
            }}
            style={styles.timelineImage}
          />
        </Pressable>
      )}

      <View style={styles.timelineCardContent}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 8,
          }}
        >
          <ThemeText fontStyle="M" fontWeight={"Medium"} color={"#ff4081"}>
            {item?.petName}
          </ThemeText>
          <ThemeText fontStyle={"XS"} color={"rgba(0, 0, 0, 0.6)"}>
            {moment(item?.createdAt).format("MMM, DD, YYYY")}
          </ThemeText>
        </View>

        {(item?.information || item?.specialTraits) && (
          <ThemeText numberOfLines={2} color={"rgba(0, 0, 0, 0.4)"}>
            {item?.information || item?.specialTraits}
          </ThemeText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: "#fff",
    padding: StyleConstants.Spacing.M,
  },
  timelineImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  timelineCardContent: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  timelineCardImageBlurHashContainer: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
  },
});

export default memo(TimelineCard);
