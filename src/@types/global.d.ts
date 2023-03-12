declare module "expo-cached-image" {
  import { ImageProps } from "react-native";

  type CachedImageProps = ImageProps & {
    cacheKey?: string;
    placeholderContent?: React.ReactElement;
  };

  export default function (props: CachedImageProps): JSX.Element;
}
