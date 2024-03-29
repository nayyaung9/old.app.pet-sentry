import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ThemeText from "../ThemeText";
import { useOwnerPosts } from "~/libs/query/post";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "~/@types/navigators";
import { Entypo } from "@expo/vector-icons";
import Loading from "../Loading";
import TimelineEmpty from "../Timeline/TimelineEmpty";
import ThemeModal from "../ThemeModal";
import TimelineMenuRoot from "../Timeline/Menu/Root";
import { useTimelineState, useTimelineStore } from "~/utils/state/timeline";

const Accouncement = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Timeline-Detail">>();
  const { colors } = useTheme();
  const { data, isLoading } = useOwnerPosts();
  const { statusMenu } = useTimelineState();
  const { onToggleStatusMenu, setPostInfoForModal } = useTimelineStore();

  const onNavigateToPostDetail = (id: string) =>
    navigation.navigate("Timeline-Detail", { postId: id });

  const onMakeActionStatusModal = (post: PetSentry.Post) => {
    onToggleStatusMenu();

    setPostInfoForModal({ postId: post._id, ownerId: post?._owner?._id });
  };

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              marginBottom: StyleConstants.Spacing.S,
              paddingHorizontal: StyleConstants.Spacing.M,
            }}
          >
            <ThemeText fontWeight="Medium">My Annoucements</ThemeText>
          </View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: StyleConstants.Spacing.M,
              marginTop: StyleConstants.Spacing.S,
            }}
          >
            {data && data?.length == 0 ? (
              <TimelineEmpty type="profile" />
            ) : (
              data &&
              data.map((post: PetSentry.Post, index: number) => (
                <View key={index} style={styles.postCardItem}>
                  <Pressable onPress={() => onNavigateToPostDetail(post?._id)}>
                    <Image
                      source={{ uri: post.photos[0] }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 4,
                      }}
                    />
                  </Pressable>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginLeft: StyleConstants.Spacing.S,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: -5,
                      }}
                    >
                      <View style={{ flex: 0.7 }}>
                        <ThemeText
                          fontWeight={"Medium"}
                          color={colors.primary}
                          numberOfLines={1}
                        >
                          {post?.petName}
                        </ThemeText>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Pressable
                          onPress={() => onMakeActionStatusModal(post)}
                        >
                          <Entypo
                            name="dots-three-vertical"
                            size={20}
                            color="black"
                          />
                        </Pressable>
                      </View>
                    </View>

                    {(post?.information || post?.specialTraits) && (
                      <ThemeText
                        numberOfLines={2}
                        color={colors.mediumDark}
                        style={{
                          marginBottom: StyleConstants.Spacing.S,
                          flex: 1,
                          marginRight: StyleConstants.Spacing.M,
                        }}
                      >
                        {post?.information || post?.specialTraits}
                      </ThemeText>
                    )}
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <View>
                        {post?.isReunited && (
                          <View
                            style={{
                              alignSelf: "flex-start",
                              paddingVertical: StyleConstants.Spacing.S - 7,
                              paddingHorizontal: StyleConstants.Spacing.S - 2,
                              borderRadius: 50,
                              backgroundColor: colors.textGreen,
                              marginBottom: StyleConstants.Spacing.S,
                            }}
                          >
                            <ThemeText
                              color={"#fff"}
                              fontWeight={"Medium"}
                              fontStyle={"S"}
                            >
                              Reunited
                            </ThemeText>
                          </View>
                        )}
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <ThemeText fontStyle={"S"} color={colors.mediumDark}>
                          {moment(post?.activityDate).format("MMM, DD, YYYY")}
                        </ThemeText>

                        {!post?.isVerify && (
                          <>
                            <ThemeText
                              color={colors.primary}
                              style={{
                                marginHorizontal: StyleConstants.Spacing.S - 4,
                              }}
                            >
                              ·
                            </ThemeText>
                            <ThemeText
                              fontStyle="S"
                              color={
                                post?.isVerify
                                  ? colors.textGreen
                                  : colors.primary
                              }
                            >
                              In Review
                            </ThemeText>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </>
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
  root: {
    flex: 1,
    paddingTop: StyleConstants.Spacing.M,
  },
  postCardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
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
