import * as SecureStore from "expo-secure-store";

const AccountStorageKeys = {
  appToken: "appToken",
};
export async function saveAuthToken(value: string) {
  await SecureStore.setItemAsync(AccountStorageKeys.appToken, value);
}

export async function getAuthToken() {
  return await SecureStore.getItemAsync(AccountStorageKeys.appToken);
}
