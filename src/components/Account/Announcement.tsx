import moment from "moment";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useOwnerPosts } from "~/libs/query/post";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import ComponentSeparator from "../Sperator";
import ThemeText from "../ThemeText";

const Accouncement = () => {
  const { colors } = useTheme();
  const { data, isLoading } = useOwnerPosts();

  console.log("data", data);
  return (
    <View style={styles.root}>
      <ThemeText
        fontWeight="Medium"
        fontStyle="L"
        style={{
          marginBottom: StyleConstants.Spacing.M,
        }}
      >
        My Annoucements
      </ThemeText>

      {isLoading ? (
        <ThemeText>Loading...</ThemeText>
      ) : (
        <View>
          {data
            ?.filter((item) => !item.isVerify)
            .map((item, index) => (
              <TouchableOpacity activeOpacity={0.5} style={styles.postCardItem} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: StyleConstants.Spacing.S,
                  }}
                >
                  <ThemeText fontStyle="S" color={colors.primary}>
                    In Review
                  </ThemeText>
                  <ThemeText color={colors.mediumDark}>
                    {item.activityType}
                  </ThemeText>
                </View>
                <ComponentSeparator />
                <View style={{ padding: StyleConstants.Spacing.S }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: StyleConstants.Spacing.S,
                    }}
                  >
                    <ThemeText fontWeight="Medium">{item.petName}</ThemeText>
                    <ThemeText fontStyle="S" color={colors.mediumDark}>
                      {moment(item.createdAt).fromNow()}
                    </ThemeText>
                  </View>
                  <ThemeText numberOfLines={2}>{item.information}</ThemeText>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: StyleConstants.Spacing.M,
    marginTop: StyleConstants.Spacing.M,
  },
  postCardItem: {
    marginBottom: StyleConstants.Spacing.M,
    backgroundColor: "#fff",
    borderRadius: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default Accouncement;
