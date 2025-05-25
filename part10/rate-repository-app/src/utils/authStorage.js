import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (e) {
      // eslint-disable-next-line no-undef
      console.error('Failed to load access token', e);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    return await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      accessToken,
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    return await AsyncStorage.removeItem(
      `${this.namespace}:accessToken`,
    );
  }
}

export default AuthStorage;