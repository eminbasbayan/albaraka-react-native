import { setAuth } from '@/redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function RootLayout() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      try {
        // Replace with actual authentication logic

        const isAuthenticated = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        dispatch(setAuth(JSON.parse(user)))
        console.log('user:', user);

        if (isAuthenticated) {
          // If authenticated, redirect to the home screen
          router.replace('/(tabs)');
        } else {
          // If not authenticated, redirect to the login screen
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000); // Simulate a delay for the redirect
    // Check if the user is authenticated
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redirecting...</Text>
      <Text>Please wait...</Text>
      <Text>If you are not redirected, please try again.</Text>
      <Text>
        If you are not redirected, please check your internet connection.
      </Text>
      <Text>Loading...</Text>
    </View>
  ); // Redirect to the home screen
}
