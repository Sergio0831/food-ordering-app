import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

const TabIndex = () => {
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