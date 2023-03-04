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
import { useTheme } from "~/utils/theme/ThemeManager";

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

  return (
    <TouchableOpacity activeOpacity={1} style={styles.timelineCard}>
      {!isHideOwner && (
        <TimelineOwner
          {...{
            postId: item?._id,
            owner: {
              profileUrl: item?._owner?.profileUrl,
              name: item?._owner?.name,
            },
          }}
        />
      )}

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
        <View style={styles.timelineCardInfoRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemeText
              fontStyle="M"
              fontWeight={"Medium"}
              color={colors.primary}
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
          <ThemeText fontStyle={"XS"} color={colors.mediumDark}>
            {moment(item?.activityDate).format("MMM, DD, YYYY")}
          </ThemeText>
        </View>

        {(item?.information || item?.specialTraits) && (
          <ThemeText numberOfLines={2} color={colors.mediumDark}>
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
    height: 220,
    borderRadius: 20,
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
  timelineCardImageBlurHashContainer: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
  },
});

export default memo(TimelineCard);
