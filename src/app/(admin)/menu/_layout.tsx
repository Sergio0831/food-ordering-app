import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/constants/Colors';

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={24}
                    color={Colors.light.tint}
                    style={{ opacity: pressed ? 0.8 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={24}
                    color={Colors.light.tint}
                    style={{ opacity: pressed ? 0.8 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default MenuLayout;

const styles = StyleSheet.create({});
