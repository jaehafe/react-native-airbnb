import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { CircleUserRound, Heart, Inbox, Search, Shell } from 'lucide-react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="wishlists"
        options={{
          tabBarLabel: 'Wishlists',
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => <Shell color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => <Inbox color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <CircleUserRound color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
