import { Dimensions } from "react-native";

export const extractShortLocation = (value: string) => {
  const getShortAddress = value?.split(",");
  return `${getShortAddress[0]},${getShortAddress[2]}`;
};

export function currencyFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getFilenameFromURL = (url: string) => {
  // return url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
  return url.split("/").pop();
};

export const calculateTabIndicatorWidth = ({
  singleTabWidth,
  numberOfTabs,
  widthOfIndicator = 40,
}: {
  singleTabWidth: number;
  numberOfTabs: number;
  widthOfIndicator?: number;
}) => {
  const { width } = Dimensions.get("window");
  const spaingLeftExtra = widthOfIndicator / 2 + 2;

  const left =
    width / numberOfTabs - singleTabWidth / numberOfTabs - spaingLeftExtra;

  return {
    left,
    tabWidth: widthOfIndicator,
  };
};
