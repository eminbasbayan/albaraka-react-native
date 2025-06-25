import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { productsData } from '@/constants/data';

export default function HomeScreen() {
  // Öne çıkan ürünler - statik veri
  const featuredProducts = productsData.slice(0, 3);
  
  // Kategoriler - statik veri
  const categories = [
    { name: 'Elektronik', icon: 'phone-portrait-outline' },
    { name: 'Giyim', icon: 'shirt-outline' },
    { name: 'Takı', icon: 'diamond-outline' },
    { name: 'Mutfak', icon: 'restaurant-outline' }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Bölümü */}
        <View style={styles.banner}>
          <Image 
            source={{ uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' }} 
            style={styles.bannerImage} 
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Yaz İndirimleri</Text>
            <Text style={styles.bannerText}>Tüm ürünlerde %30'a varan indirimler</Text>
            <Button title="Keşfet" onPress={() => {}} variant="primary" />
          </View>
        </View>

        {/* Kategoriler Bölümü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name={category.icon} size={24} color="#2f95dc" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Öne Çıkan Ürünler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
          <View style={styles.productsContainer}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.productWrapper}>
                <ProductCard {...product} />
              </View>
            ))}
          </View>
          <View style={styles.viewAllContainer}>
            <Button title="Tümünü Gör" onPress={() => {}} variant="outline" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    height: 180,
    position: 'relative',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 12,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  productWrapper: {
    width: '100%',
    padding: 4,
  },
  viewAllContainer: {
    alignItems: 'center',
    marginTop: 16,
  }
});