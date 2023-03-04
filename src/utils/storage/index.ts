import * as SecureStore from "expo-secure-store";

const AccountStorageKeys = {
  appToken: "appToken",
  userId: "userId",
};
export async function saveAuthToken({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  await SecureStore.setItemAsync(AccountStorageKeys.appToken, token);
  await SecureStore.setItemAsync(AccountStorageKeys.userId, userId);
}

export async function getAuthToken() {
  const token = await SecureStore.getItemAsync(AccountStorageKeys.appToken);
  const userId = await SecureStore.getItemAsync(AccountStorageKeys.userId);

  return { token, userId };
}

export async function removeAuthToken() {
  await SecureStore.deleteItemAsync(AccountStorageKeys.appToken);
  return await SecureStore.deleteItemAsync(AccountStorageKeys.userId);
}
