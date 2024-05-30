import { FlatList, StyleSheet, View } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { Redirect } from 'expo-router';

export default function TabOneScreen() {
  return <Redirect href={'(admin)/menu'} />;
}
