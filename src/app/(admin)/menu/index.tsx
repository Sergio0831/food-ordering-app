import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductsList } from '@/src/api/produscts';

const TabIndex = () => {
  const { data: products, error, isLoading } = useProductsList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
};

export default TabIndex;

const styles = StyleSheet.create({});
