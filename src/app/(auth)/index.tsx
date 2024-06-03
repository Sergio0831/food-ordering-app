import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import Button from '@/src/components/Button';

const AuthIndex = () => {
  return (
    <View>
      <Link href="/sign-in" asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
};

export default AuthIndex;

const styles = StyleSheet.create({});
