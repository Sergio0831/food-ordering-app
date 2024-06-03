import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import orders from '@/assets/data/orders';

import OrderListItem from '@/src/components/OrderListItem';
import { Stack } from 'expo-router';

const OrdersScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Archive' }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
};

export default OrdersScreen;
