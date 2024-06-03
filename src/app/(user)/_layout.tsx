import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';
import { useAuthContext } from '@/src/hooks/useAuthContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { session } = useAuthContext();

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabBarIcon name="pizza-outline" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-outline" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
