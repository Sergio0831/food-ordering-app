import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PizzaSize } from '@/src/types';
import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useCartContext } from '@/src/hooks/useCartContext';
import { useProduct } from '@/src/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { id } = useLocalSearchParams();
  const { addItem } = useCartContext();
  const router = useRouter();

  console.log(id);

  const {
    data: product,
    error,
    isLoading,
  } = useProduct(parseInt(typeof id === 'string' ? id : id[0]));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error && !product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.subtitle}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              { backgroundColor: size === selectedSize ? 'gainsboro' : '#fff' },
            ]}>
            <Text
              style={[
                styles.sizeText,
                {
                  color: size === selectedSize ? 'black' : 'gray',
                },
              ]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price: &euro;{product.price.toFixed(2)}</Text>
      <Button text="Add to cart" onPress={addToCart} />
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
    marginVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
