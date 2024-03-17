import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ListingsProps {
  listings: any[];
  category: string;
}

export default function Listings({ listings, category }: ListingsProps) {
  React.useEffect(() => {
    console.log('listing length>>', listings.length);
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
