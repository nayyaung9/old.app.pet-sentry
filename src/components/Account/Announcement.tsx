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

const Accouncement = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Timeline-Detail">>();
  const { colors } = useTheme();
  const { data, isLoading } = useOwnerPosts();

  const onNavigateToPostDetail = (id: string) =>
    navigation.navigate("Timeline-Detail", { postId: id });

  return (
    <View style={styles.root}>
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
      </View>

      <View
        style={{
          paddingHorizontal: StyleConstants.Spacing.M,
          marginTop: StyleConstants.Spacing.S,
        }}
      >
        {isLoading ? (
          <ThemeText>Loading...</ThemeText>
        ) : (
          <>
            {data.map((post: PetSentry.Post, index: number) => (
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
                      <Pressable>
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color="black"
                        />
                      </Pressable>
                    </View>
                  </View>
                  {!post.isVerify ? (
                    <View
                      style={{
                        paddingVertical: StyleConstants.Spacing.S - 7,
                        paddingHorizontal: StyleConstants.Spacing.S - 2,
                        borderRadius: 50,
                        backgroundColor: colors.primary,
                        marginTop: StyleConstants.Spacing.S,
                      }}
                    >
                      <ThemeText
                        color={"#fff"}
                        fontWeight={"Medium"}
                        fontStyle={"S"}
                      >
                        In Review
                      </ThemeText>
                    </View>
                  ) : (
                    <View
                      style={{
                        paddingVertical: StyleConstants.Spacing.S - 7,
                        paddingHorizontal: StyleConstants.Spacing.S - 2,
                        borderRadius: 50,
                        backgroundColor: colors.textGreen,
                        marginTop: StyleConstants.Spacing.S,
                      }}
                    >
                      <ThemeText
                        color={"#fff"}
                        fontWeight={"Medium"}
                        fontStyle={"S"}
                      >
                        Published
                      </ThemeText>
                    </View>
                  )}

                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {(post?.information || post?.specialTraits) && (
                      <ThemeText
                        numberOfLines={1}
                        color={colors.mediumDark}
                        style={{ marginBottom: StyleConstants.Spacing.S }}
                      >
                        {post?.information || post?.specialTraits}
                      </ThemeText>
                    )}
                    <ThemeText fontStyle={"S"} color={colors.mediumDark}>
                      {moment(post?.activityDate).format("MMM, DD, YYYY")}
                    </ThemeText>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: StyleConstants.Spacing.M,
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
