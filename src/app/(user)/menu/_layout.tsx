import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const MenuLayout = () => {
  return (
    <Stack
      screenOptions={{
        title: 'Menu',
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color={Colors.light.tint}
                  style={{ opacity: pressed ? 0.8 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}></Stack>
  );
};

export default MenuLayout;

const styles = StyleSheet.create({});
