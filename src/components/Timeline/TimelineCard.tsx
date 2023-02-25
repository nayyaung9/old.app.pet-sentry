import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabsScreenProps } from "~/@types/navigators";

const TimelineCard = ({ item }: { item: any }) => {
  const navigation =
    useNavigation<BottomTabsScreenProps<"Tab-Home">["navigation"]>();
  return (
    <TouchableOpacity activeOpacity={1} style={styles.timelineCard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <Image
          source={{ uri: item?._owner?.profileUrl }}
          style={{ width: 42, height: 42, borderRadius: 100 }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text>{item?._owner?.fullname}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="md-location"
              size={14}
              color={"rgba(0, 0, 0, 0.7)"}
            />
            <Text
              fontStyle={"XS"}
              fontWeight={"Medium"}
              color={"rgba(0, 0, 0, 0.4)"}
            >
              Tarmwe, Yangon
            </Text>
          </View>
        </View>
      </View>

      {Array.isArray(item?.photos) && item?.photos?.length >= 1 && (
        <Pressable
          onPress={() => navigation.navigate("Timeline-Detail", { data: item })}
        >
          <Image
            source={{
              uri: item.photos[0].url,
            }}
            // imageStyle={styles.timelineImage}
            // blurHash={item?.photos[0]?.blurHashValue}
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
          <Text fontStyle="M" fontWeight={"Medium"} color={"#ff4081"}>
            {item?.petName}
          </Text>
          <Text fontStyle={"XS"} color={"rgba(0, 0, 0, 0.6)"}>
            {/* {moment(item?.createdAt).format("MMM, DDD, YYYY")} */}
            Feb 24, 2023
          </Text>
        </View>

        {(item?.information || item?.specialTraits) && (
          <Text numberOfLines={2} color={"rgba(0, 0, 0, 0.4)"}>
            {item?.information || item?.specialTraits}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: "#fff",
    padding: 16,
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

export default TimelineCard;
