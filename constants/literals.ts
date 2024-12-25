const brandName = 'Task Timer' as const;

enum SecureStorageKeys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  EXPO_PUSH_TOKEN = "EXPO_PUSH_TOKEN"
}

export default {
  brandName,
  SecureStorageKeys,
} as const;
