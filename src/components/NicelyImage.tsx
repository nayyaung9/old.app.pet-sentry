import React from "react";
import CachedImage from "expo-cached-image";
import { ActivityIndicator, ImageStyle, StyleProp, View } from "react-native";
import { useTheme } from "~/utils/theme/ThemeManager";
import * as Crypto from "expo-crypto";

type NicelyImageProps = {
  uri: string;
  containerStyle: StyleProp<ImageStyle>;
};
const NicelyImage = ({ uri, containerStyle }: NicelyImageProps) => {
  const { colors } = useTheme();

  console.log(uri)

  return (
    <CachedImage
      source={{
        uri: `${uri}`,
      }}
      cacheKey={uri}
      placeholderContent={
        <View
          style={{
            backgroundColor: "#ddd",
            flex: 1,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            color={colors.inactiveTabBar}
            size="small"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          />
        </View>
      }
      style={containerStyle}
    />
  );
};

export default NicelyImage;
