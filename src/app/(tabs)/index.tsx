import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import ExploreHeader from '@/src/components/ExploreHeader';
import Listings from '@/src/components/Listings';
import listingData from '@/src/assets/data/airbnb-listings.json';

export default function Index() {
  const [category, setCategory] = React.useState('Tiny homes');
  const items = React.useMemo(() => listingData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings items={items} category={category} />
    </View>
  );
}

const styles = StyleSheet.create({});
