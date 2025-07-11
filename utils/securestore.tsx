import * as SecureStore from "expo-secure-store";

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("auth_token", token);
  } catch (e) {
    console.error("Failed to save token", e);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("auth_token");
  } catch (e) {
    console.error("Failed to read token", e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("auth_token");
  } catch (e) {
    console.error("Failed to remove token", e);
  }
};
