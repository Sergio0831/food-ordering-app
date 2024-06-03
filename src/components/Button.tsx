import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef } from 'react';
import Colors from '../constants/Colors';

type ButtonProps = {
  text: string;
  transparent?: boolean;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, transparent, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={[
          styles.container,
          { backgroundColor: transparent ? 'transparent' : Colors.light.tint },
        ]}
        accessibilityRole="button">
        <Text style={[styles.text, { color: transparent ? Colors.light.tint : '#fff' }]}>
          {text}
        </Text>
      </Pressable>
    );
  },
);

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
