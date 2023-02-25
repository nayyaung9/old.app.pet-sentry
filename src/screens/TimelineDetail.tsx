import React from "react";
import {
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { RootStackScreenProps } from "~/@types/navigators";

const DEVICE = Dimensions.get("window");

const TimelineDetail: React.FC<RootStackScreenProps<"Timeline-Detail">> = ({
  route: {
    params: { data },
  },
  navigation,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 16,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {data?.photos?.length >= 1 && (
          <Image
            source={{ uri: data?.photos[0]?.url }}
            style={styles.petImageContainer}
            // uri={{
            //   remote: data?.photos[0]?.url,
            // }}
            // imageStyle={styles.petImageContainer}
            // blurHash={data?.photos[0]?.blurHashValue}
          />
        )}

        <View style={styles.contentContainer}>
          <View style={styles.petInfoCardRow}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ flex: 1 }}
                fontWeight={"Medium"}
                fontStyle={"L"}
                numberOfLines={2}
              >
                {data?.petName}
              </Text>
              {/* 
                  <IconLabel
                    iconComponent={Feather}
                    iconName={"eye"}
                    label={24}
                    containerStyle={{ justifyContent: "flex-end" }}
                    labelStyle={{ paddingLeft: 8 - 2 }}
                  /> */}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <IconLabel
                    iconComponent={Ionicons}
                    iconName={"location-outline"}
                    label={extractShortLocation(data?.geolocation?.address)}
                  /> */}
              <Text fontStyle={"S"}>{data?.activityType}</Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.basicInfoRow}>
              <View style={{ flex: 1 }}>
                <Text color={"#ddd"} fontStyle={"XS"}>
                  Gender
                </Text>
                <Text>{data?.gender ? "Male" : "Female"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text color={"#ddd"} fontStyle={"XS"}>
                  Lost Date
                </Text>
                <Text>
                  {/* {moment(data?.createdAt).format("MMM DDD YYYY")} */}
                  Feb 30, 2023
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text color={"#ddd"} fontStyle={"XS"}>
                  Collar color
                </Text>
                <Text>{data?.collarColor}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View>
              {data?.geolocation?.address != "" && (
                <View style={{ marginBottom: 8 }}>
                  <Text color={"#ddd"} fontStyle={"XS"}>
                    Missing here
                  </Text>
                  <Text>{data?.geolocation?.address}</Text>
                </View>
              )}

              {data?.information != "" && (
                <View style={{ marginBottom: 8 }}>
                  <Text color={"#ddd"} fontStyle={"XS"}>
                    Information
                  </Text>
                  <Text>{data?.information}</Text>
                </View>
              )}

              {data?.specialTraits != "" && data?.specialTraits != null && (
                <View>
                  <Text color={"#ddd"} fontStyle={"XS"}>
                    Special Traits
                  </Text>
                  <Text>{data?.specialTraits}</Text>
                </View>
              )}
            </View>
          </View>

          {/* <Pressable
            onPress={() =>
              navigation.navigate("Map", {
                isPin: false,
                point: {
                  latitude: data?.geolocation?.coordinates[1],
                  longitude: data?.geolocation?.coordinates[0],
                },
              })
            }
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  petImageContainer: {
    width: "100%",
    height: DEVICE.height / 2.6,
    borderRadius: 20,
  },
  petInfoCardRow: {
    flexDirection: "column",
    paddingVertical: 8,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    paddingVertical: 8,
  },
  basicInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default TimelineDetail;
