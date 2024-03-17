import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import ExploreHeader from '@/src/components/ExploreHeader';
import Listings from '@/src/components/Listings';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Listings />
    </View>
  );
}

const styles = StyleSheet.create({});
