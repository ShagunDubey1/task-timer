import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/useAuthStore';
import { getToken } from '@/libs/utils/secureStore';
import literals from '@/constants/literals';
import { AlertNotificationRoot } from 'react-native-alert-notification';
export { ErrorBoundary } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useExpoPushStore } from '@/stores/useExpoTokenStore';
import { usePushNotifications } from '@/libs/hooks/usePushNotifications';

export const unstable_settings = {
  initialRouteName: '/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const { setExpoPushToken, getExpoPushToken } = useExpoPushStore();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { notification } = usePushNotifications(
    setExpoPushToken,
    getExpoPushToken
  );

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      return;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const queryClient = new QueryClient();

  const router = useRouter();
  const segments = useSegments();

  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await getToken(
        literals.SecureStorageKeys.ACCESS_TOKEN
      );

      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (typeof isAuthenticated === 'undefined') return;
    if (isAuthenticated === false && !inAuthGroup) {
      router.replace('/login');
    } else if (isAuthenticated === true && !inAuthGroup) {
      router.replace('/tasks');
    }
  }, [isAuthenticated, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AlertNotificationRoot
          theme="light"
          dialogConfig={{
            closeOnOverlayTap: false,
          }}
        >
          <Slot />
        </AlertNotificationRoot>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
