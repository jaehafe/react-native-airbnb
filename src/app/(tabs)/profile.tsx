import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { useAuth } from '@clerk/clerk-expo';

export default function Profile() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={'/(modals)/login'}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
