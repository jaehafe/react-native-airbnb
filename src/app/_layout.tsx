import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { X } from 'lucide-react-native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
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
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          headerTitle: 'Log in or Sign up',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={20} color={'black'} />
            </TouchableOpacity>
          ),
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          headerTitle: 'booking',
          animation: 'fade',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={20} color={'black'} />
            </TouchableOpacity>
          ),
          presentation: 'transparentModal',
        }}
      />
    </Stack>
  );
}
