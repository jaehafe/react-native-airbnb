import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login</Link>
      <Link href={'/(modals)/booking'}>booking</Link>
      <Link href={'/listing/1233'}>Listing details</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
