import { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';

export default function Index() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products/');

      if (!res.ok) {
        throw new Error('Response ok değil!');
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      Alert.alert(
        'Hata',
        'Ürünler Yüklenirken hata oluştu. Lütfen tekrar deneyin!'
      );
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Ürünlerimiz
        </Text>

        <Button title="Ürünleri Getir" onPress={fetchProducts} />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <ProductCard key={item.id} {...item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
