import { Stack } from 'expo-router';
import CounterProvider from '@/context/CounterContext';
import CartProvider from '@/context/CartContext';

export default function RootLayout() {
  return (
    <CounterProvider>
      <CartProvider>
        <Stack />
      </CartProvider>
    </CounterProvider>
  );
}
