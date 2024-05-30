import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CartItem } from '../types';
import Colors from '../constants/Colors';
import { defaultPizzaImage } from './ProductListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useCartContext } from '../hooks/useCartContext';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { product, size, quantity, id } = cartItem;
  const { updateQuantity } = useCartContext();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.title}>&euro;{product.price.toFixed(2)}</Text>
          <Text style={styles.title}>Size: {size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          name="minus"
          color="grey"
          style={{ padding: 5 }}
          onPress={() => updateQuantity(id, -1)}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <FontAwesome
          name="plus"
          color="grey"
          style={{ padding: 5 }}
          onPress={() => updateQuantity(id, 1)}
        />
      </View>
    </View>
  );
};

export default CartListItem;

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
