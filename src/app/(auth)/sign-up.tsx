import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import { Link, Stack } from 'expo-router';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john@mail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />

      <Text style={styles.error}>{errors}</Text>
      <Button
        style={styles.textButton}
        text={loading ? 'Creating account...' : 'Create an account'}
        onPress={signUpWithEmail}
        disabled={loading}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
