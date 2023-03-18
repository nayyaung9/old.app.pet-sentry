import React, { useEffect, useMemo } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Image,
  Platform,
} from "react-native";
import ThemeText from "~/components/ThemeText";
import Label from "~/components/Label";
import OwnerInfo from "~/components/OwnerInfo";
import TimelineReunited from "~/components/Timeline/TimelineReunited";
import ThemeModal from "~/components/ThemeModal";
import TimelineMenuRoot from "~/components/Timeline/Menu/Root";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Flow } from "react-native-animated-spinkit";

// Utils & Queries
import moment from "moment";
import _ from "lodash";
import { StyleConstants } from "~/utils/theme/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "~/utils/theme/ThemeManager";
import { usePostDetail } from "~/libs/query/post";
import { useTimelineStore, useTimelineState } from "~/utils/state/timeline";

import type { RootStackScreenProps } from "~/@types/navigators";

const DEVICE = Dimensions.get("window");

const TimelineDetail: React.FC<RootStackScreenProps<"Timeline-Detail">> = ({
  route: {
    params: { postId },
  },
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { statusMenu } = useTimelineState();
  const { onToggleStatusMenu, setPostInfoForModal } = useTimelineStore();

  // Query Hooks
  const { data, isLoading } = usePostDetail({
    postId,
    options: {
      enabled: !!postId,
    },
  });

  // const onNavigateToMap = () => {
  //   navigation.navigate("Map-Screen", {
  //     isPin: false,
  //     point: {
  //       latitude: data?.geolocation?.coordinates[1],
  //       longitude: data?.geolocation?.coordinates[0],
  //     },
  //   });
  // };

  const onMakeActionStatusModal = () => {
    onToggleStatusMenu();
    setPostInfoForModal({ postId, ownerId: data?._owner?._id as string });
  };

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
          <View>
            <Pressable
              disabled={isLoading}
              style={styles.iconButton}
              onPress={onMakeActionStatusModal}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#555"
              />
            </Pressable>
          </View>
        </View>
      ),
    });
  }, [navigation, isLoading]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isLoading ? "dark" : "light"} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Flow color={colors.primary} />
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
          {Array.isArray(data?.photos) &&
            data?.photos &&
            data?.photos?.length >= 1 && (
              <ImageBackground
                source={{ uri: data?.photos[0] }}
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
                        marginBottom: data?.systemedShortAddress
                          ? 0
                          : StyleConstants.Spacing.S,
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
                          <ThemeText color={colors.primary}>
                            In Review
                          </ThemeText>
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
                      {data?.systemedShortAddress && (
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
                            {data?.systemedShortAddress}
                          </ThemeText>
                        </View>
                      )}
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          paddingHorizontal: 12,
                          borderRadius: 10,
                          paddingBottom: Platform.select({
                            ios: 4,
                            android: 0,
                          }),
                        }}
                      >
                        <ThemeText color={"#fff"}>
                          {data?.activityType}
                        </ThemeText>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            )}

          <View style={styles.contentContainer}>
            {data?.isReunited && <TimelineReunited />}
            <View
              style={{
                marginTop: data?.isReunited ? StyleConstants.Spacing.M - 4 : 0,
              }}
            >
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

            {Array.isArray(data?.photos) &&
              data?.photos &&
              data?.photos?.length >= 2 && (
                <View>
                  <ThemeText
                    color={"#000"}
                    fontStyle={"M"}
                    fontWeight={"Medium"}
                  >
                    Photos
                  </ThemeText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: StyleConstants.Spacing.S,
                    }}
                  >
                    {_.tail(data?.photos).map((img, index) => {
                      return (
                        <Image
                          source={{ uri: img }}
                          style={{
                            width: 70,
                            height: 70,
                            marginRight: StyleConstants.Spacing.S,
                            borderRadius: 8,
                          }}
                          key={index}
                        />
                      );
                    })}
                  </View>
                </View>
              )}
          </View>
        </ScrollView>
      )}

      <ThemeModal
        openThemeModal={statusMenu}
        onCloseThemeModal={onToggleStatusMenu}
        parentPaddingEnabled={false}
      >
        <TimelineMenuRoot />
      </ThemeModal>
    </View>
  );
};

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
