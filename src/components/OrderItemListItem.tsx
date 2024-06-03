import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { OrderItem } from '../types';
import { defaultPizzaImage } from './ProductListItem';

type OrderItemListItemProps = {
  orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
  const { image, name, price } = orderItem.products;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: image || defaultPizzaImage }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}> &euro;{price}</Text>
          <Text>Size: {orderItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{orderItem.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});
