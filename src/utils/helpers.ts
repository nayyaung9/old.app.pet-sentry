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
