export const extractShortLocation = (value: string) => {
  const getShortAddress = value?.split(",");
  return `${getShortAddress[0]},${getShortAddress[2]}`;
};

export function currencyFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
