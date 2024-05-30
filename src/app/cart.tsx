import { Platform, StyleSheet, FlatList, View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCartContext } from '../hooks/useCartContext';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
  const { items, total } = useCartContext();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 500 }}>
        {' '}
        Total: &euro;{total.toFixed(2)}
      </Text>
      <Button text="Checkout" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
