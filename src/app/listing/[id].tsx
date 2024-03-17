import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function Listing() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id>>', id);

  return (
    <View>
      <Text>Listing</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
