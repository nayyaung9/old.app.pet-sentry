import React from "react";
import { Dimensions, ScrollView, StyleSheet, View, Image } from "react-native";
import ThemeText from "~/components/ThemeText";
import type { RootStackScreenProps } from "~/@types/navigators";

const DEVICE = Dimensions.get("window");

const TimelineDetail: React.FC<RootStackScreenProps<"Timeline-Detail">> = ({
  route: {
    params: { data },
  },
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
              <ThemeText
                style={{ flex: 1 }}
                fontWeight={"Medium"}
                fontStyle={"L"}
                numberOfLines={2}
              >
                {data?.petName}
              </ThemeText>
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
              <ThemeText fontStyle={"S"}>{data?.activityType}</ThemeText>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.basicInfoRow}>
              <View style={{ flex: 1 }}>
                <ThemeText color={"#555"} fontStyle={"XS"}>
                  Gender
                </ThemeText>
                <ThemeText>{data?.gender ? "Male" : "Female"}</ThemeText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemeText color={"#555"} fontStyle={"XS"}>
                  Lost Date
                </ThemeText>
                <ThemeText>
                  {/* {moment(data?.createdAt).format("MMM DDD YYYY")} */}
                  Feb 30, 2023
                </ThemeText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemeText color={"#ddd"} fontStyle={"XS"}>
                  Collar color
                </ThemeText>
                <ThemeText>{data?.collarColor}</ThemeText>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View>
              {data?.geolocation?.address != "" && (
                <View style={{ marginBottom: 8 }}>
                  <ThemeText color={"#555"} fontStyle={"XS"}>
                    Missing here
                  </ThemeText>
                  <ThemeText>{data?.geolocation?.address}</ThemeText>
                </View>
              )}

              {data?.information != "" && (
                <View style={{ marginBottom: 8 }}>
                  <ThemeText color={"#555"} fontStyle={"XS"}>
                    Information
                  </ThemeText>
                  <ThemeText>{data?.information}</ThemeText>
                </View>
              )}

              {data?.specialTraits != "" && data?.specialTraits != null && (
                <View>
                  <ThemeText color={"#555"} fontStyle={"XS"}>
                    Special Traits
                  </ThemeText>
                  <ThemeText>{data?.specialTraits}</ThemeText>
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
