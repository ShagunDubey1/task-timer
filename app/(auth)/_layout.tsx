import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="tasks/index" options={{ headerShown: false }} />
    </Stack>
  );
}
