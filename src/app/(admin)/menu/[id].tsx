import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';

const ProductPage = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.subtitle}>{product.name}</Text>
      <Text style={styles.price}>Price: &euro;{product.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
