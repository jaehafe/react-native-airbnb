import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
export { ErrorBoundary } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { X } from 'lucide-react-native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

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

      <Stack.Screen name="listing/[id]" options={{ headerTitle: '', headerTransparent: true }} />

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
