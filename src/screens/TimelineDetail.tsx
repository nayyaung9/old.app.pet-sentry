import React, { useEffect, useMemo } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import Button from "~/components/Button";
import ThemeText from "~/components/ThemeText";
import type { RootStackScreenProps } from "~/@types/navigators";
import { extractShortLocation } from "~/utils/helpers";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { StyleConstants } from "~/utils/theme/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Label from "~/components/Label";
import OwnerInfo from "~/components/OwnerInfo";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "~/utils/theme/ThemeManager";
import { usePostDetail } from "~/libs/query/post";
import { Flow } from "react-native-animated-spinkit";
import moment from "moment";

const DEVICE = Dimensions.get("window");

const TimelineDetail: React.FC<RootStackScreenProps<"Timeline-Detail">> = ({
  route: {
    params: { postId },
  },
  navigation,
}) => {
  const { data, isLoading } = usePostDetail({
    postId,
    options: {
      enabled: !!postId,
    },
  });

  console.log("Date", JSON.stringify(data, null, 2));
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const onNavigateToMap = () => {
    navigation.navigate("Map-Screen", {
      isPin: false,
      point: {
        latitude: data?.geolocation?.coordinates[1],
        longitude: data?.geolocation?.coordinates[0],
      },
    });
  };

  const isOwner = useMemo(() => {
    return data?._owner?._id == "63fce037dce4dc34212aa459" ? true : false;
  }, [data?._owner?._id]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={[
            styles.header,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons name="chevron-back" size={24} color="#555" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <AntDesign name="hearto" size={14} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isLoading ? "dark" : "light"} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Flow />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {data?.photos?.length >= 1 && (
            <ImageBackground
              source={{ uri: data?.photos[0]?.url }}
              style={styles.petImageContainer}
            >
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)"]}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: insets.top,
                }}
              />
              <LinearGradient
                colors={["transparent", "rgba(37, 37, 37, 0.7)"]}
                style={styles.linearGradient}
              >
                <View style={styles.petInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: StyleConstants.Spacing.S,
                    }}
                  >
                    <ThemeText
                      fontWeight={"Medium"}
                      fontStyle={"L"}
                      numberOfLines={2}
                      color={"#fff"}
                    >
                      {data?.petName}
                    </ThemeText>
                    {!data?.isVerify && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: -3,
                        }}
                      >
                        <ThemeText
                          color={colors.primary}
                          style={{
                            marginHorizontal: StyleConstants.Spacing.S - 2,
                          }}
                        >
                          ·
                        </ThemeText>
                        <ThemeText color={colors.primary}>In Review</ThemeText>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: -4,
                      }}
                    >
                      <Ionicons name="location" size={20} color="#fff" />
                      <ThemeText
                        fontStyle={"M"}
                        style={{ marginLeft: StyleConstants.Spacing.S - 4 }}
                        color={"#fff"}
                        numberOfLines={2}
                      >
                        {extractShortLocation(
                          data?.geolocation?.address as string
                        )}
                      </ThemeText>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: 12,
                        paddingBottom: 4,
                        borderRadius: 10,
                      }}
                    >
                      <ThemeText fontStyle={"L"} color={"#fff"}>
                        {data?.activityType}
                      </ThemeText>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          )}

          <View style={styles.contentContainer}>
            <View>
              {data?.information && (
                <Label
                  label="Information"
                  value={data?.information as string}
                />
              )}

              {data?.geolocation?.address && (
                <Label
                  label="Missing here"
                  value={data?.geolocation?.address as string}
                  leftComponent={
                    <Pressable onPress={onNavigateToMap}>
                      <AntDesign name="arrowright" size={24} color="black" />
                    </Pressable>
                  }
                />
              )}

              {data?.specialTraits && (
                <Label label="Special Traits" value={data?.specialTraits} />
              )}
            </View>

            <View style={styles.basicInfoRow}>
              <Label
                containerStyle={{ flex: 1 }}
                label="Gender"
                value={data?.gender ? "Male" : "Female"}
              />
              <Label
                containerStyle={{ flex: 1 }}
                label="Lost Date"
                value={moment(data?.activityDate).format("MMM DD, YYYY")}
              />
              <Label
                containerStyle={{ flex: 1 }}
                label="Collar color"
                value={data?.collarColor as string}
              />
            </View>

            <OwnerInfo />

            <View>
              <ThemeText color={"#000"} fontStyle={"M"} fontWeight={"Medium"}>
                Photos
              </ThemeText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: StyleConstants.Spacing.S,
                }}
              >
                {images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: StyleConstants.Spacing.S,
                      borderRadius: 8,
                    }}
                  />
                ))}
              </View>
            </View>

            {isOwner && (
              <View style={{ marginTop: StyleConstants.Spacing.L }}>
                <Button borderRadius={8}>
                  <FontAwesome name="edit" size={24} color="#fff" />
                  <ThemeText
                    color={"#fff"}
                    fontWeight={"Medium"}
                    style={{ marginLeft: StyleConstants.Spacing.S }}
                  >
                    Edit Post
                  </ThemeText>
                </Button>
                <Button borderRadius={8}>
                  <ThemeText
                    color={"#fff"}
                    fontWeight={"Medium"}
                    style={{ marginLeft: StyleConstants.Spacing.S }}
                  >
                    Set pet as Reunited
                  </ThemeText>
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const images = [
  "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=800",
];
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  iconButton: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
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
    height: DEVICE.height / 2,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: StyleConstants.Spacing.S,
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  basicInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  petInfo: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 16,
  },
});
export default TimelineDetail;
