import React from "react";
import CachedImage from "expo-cached-image";
import { ActivityIndicator, ImageStyle, StyleProp } from "react-native";
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
        uri,
      }}
      cacheKey={cacheKey}
      placeholderContent={
        <ActivityIndicator
          color={colors.background}
          size="small"
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        />
      }
      style={containerStyle}
    />
  );
};

export default NicelyImage;
