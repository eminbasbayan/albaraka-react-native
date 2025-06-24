import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import Counter from '@/components/Counter';
import CounterModal from '@/components/CounterModal';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Index(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchProducts = async (): Promise<void> => {
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

  useEffect(() => {
    console.log('component ilk yüklendiğinde çalışır!');

    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button title="Modalı Aç" onPress={() => setModalVisible(true)} />
        {modalVisible && (
          <CounterModal onClose={() => setModalVisible(false)} visible={modalVisible} />
        )}

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
