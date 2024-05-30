import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../types';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: product.image || defaultPizzaImage,
          }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
});
