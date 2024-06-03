import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Order } from '../types';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'grey',
  },
  status: {
    fontWeight: '500',
  },
});
