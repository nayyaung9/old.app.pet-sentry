import React from "react";
import CachedImage from "expo-cached-image";
import { ActivityIndicator, ImageStyle, StyleProp, View } from "react-native";
import { useTheme } from "~/utils/theme/ThemeManager";
import { getFilenameFromURL } from "~/utils/helpers";

type NicelyImageProps = {
  uri: string;
  containerStyle: StyleProp<ImageStyle>;
};
const NicelyImage = ({ uri, containerStyle }: NicelyImageProps) => {
  const { colors } = useTheme();
  const cacheKey = getFilenameFromURL(uri);

  return (
    <CachedImage
      source={{
        uri: `${uri}`,
      }}
      cacheKey={`${cacheKey}`}
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
