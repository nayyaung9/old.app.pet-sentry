import { Dimensions } from "react-native";
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please provide your email."),
  password: yup
    .string()
    .required("Please provide your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const registerSchema = yup.object({
  fullname: yup.string().min(3).required("Please provide your fullname"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please provide your email."),
  password: yup
    .string()
    .required("Please provide your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirmation: yup
    .string()
    .required("Please re-type your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

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
