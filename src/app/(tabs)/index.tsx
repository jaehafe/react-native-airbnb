import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import ExploreHeader from '@/src/components/ExploreHeader';
import ListingsMap from '@/src/components/ListingsMap';

import listingData from '@/src/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/src/assets/data/airbnb-listings.geo.json';
import ListingBottomSheet from '@/src/components/ListingBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function Index() {
  const [category, setCategory] = React.useState('Tiny homes');
  const items = React.useMemo(() => listingData as any, []);
  const getoItems = React.useMemo(() => listingsDataGeo as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: 130 }}>
      <BottomSheetModalProvider>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
          }}
        />
        {/* <Listings items={items} category={category} /> */}
        <ListingsMap listings={getoItems} />
        <ListingBottomSheet listings={items} category={category} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
