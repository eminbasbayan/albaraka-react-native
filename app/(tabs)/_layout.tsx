import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const [newCartItems, setNewCartItems] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);

  const getCartItemsCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {}, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Ürünler',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="list-outline" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sepetim',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart-outline" size={size} color={color} />;
          },
          tabBarBadge: getCartItemsCount,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
