import React, { memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import ThemeText from "~/components/ThemeText";
import TimelineReunited from "./TimelineReunited";
import TimelineOwner from "./TimelineOwner";

// Utils & Queries
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import type { BottomTabsScreenProps } from "~/@types/navigators";

const TimelineCard = ({
  item,
  isHideOwner = false,
}: {
  item: PetSentry.Post;
  isHideOwner?: boolean;
}) => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Home">["navigation"]>();

  const onNavigateToTimelineDetail = (postId: string, petName: string | null) =>
    navigation.navigate("Timeline-Detail", {
      postId,
      petName: petName as string,
    });

  return (
    <TouchableOpacity activeOpacity={1} style={styles.timelineCard}>
      {!isHideOwner && (
        <TimelineOwner
          {...{
            postId: item?._id,
            owner: {
              ownerId: item?._owner?._id,
              profileUrl: item?._owner?.profileUrl,
              name: item?._owner?.name,
              systemedShortAddress: item?.systemedShortAddress,
            },
          }}
        />
      )}

      {Array.isArray(item?.photos) && item?.photos?.length >= 1 && (
        <Pressable
          onPress={() => onNavigateToTimelineDetail(item?._id, item?.petName)}
        >
          <Image
            source={{ uri: item.photos[0] }}
            style={styles.timelineImage}
          />
        </Pressable>
      )}

      {item?.isReunited && <TimelineReunited />}

      <Pressable
        style={styles.timelineCardContent}
        onPress={() => onNavigateToTimelineDetail(item?._id, item?.petName)}
      >
        <View style={styles.timelineCardInfoRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.7, flexDirection: "row" }}>
              <ThemeText
                fontWeight={"Medium"}
                color={colors.primary}
                numberOfLines={1}
                style={{
                  marginRight: StyleConstants.Spacing.S - 4,
                }}
              >
                {item?.petName}
              </ThemeText>

              {!item.isVerify && (
                <>
                  <ThemeText
                    color={colors.primary}
                    style={{
                      marginRight: StyleConstants.Spacing.S - 4,
                    }}
                  >
                    ·
                  </ThemeText>
                  <ThemeText fontStyle="S" color={colors.primary}>
                    In Review
                  </ThemeText>
                </>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <ThemeText fontStyle={"XS"} color={colors.mediumDark}>
              {moment(item?.activityDate).format("MMM, DD, YYYY")}
            </ThemeText>
          </View>
        </View>

        {(item?.information || item?.specialTraits) && (
          <ThemeText numberOfLines={2} color={colors.mediumDark}>
            {item?.information || item?.specialTraits}
          </ThemeText>
        )}
      </Pressable>
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
    borderRadius: 10,
  },
  timelineCardContent: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  timelineCardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: StyleConstants.Spacing.S - 4,
  },
});

export default memo(TimelineCard);
