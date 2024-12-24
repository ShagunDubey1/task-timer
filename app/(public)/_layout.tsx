import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="logout/index" options={{}} />
    </Stack>
  );
}
