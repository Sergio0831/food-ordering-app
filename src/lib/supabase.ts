import * as SecureStorage from 'expo-secure-store';
import 'react-native-url-polyfill';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStorage.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStorage.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStorage.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
