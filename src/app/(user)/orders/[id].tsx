import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

const OrderScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
