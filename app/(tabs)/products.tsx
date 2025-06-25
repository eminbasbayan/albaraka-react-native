import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '@/components/ProductCard';
import { productsData } from '@/constants/data';
import { useContext, useState } from 'react';
import { CounterContext } from '@/context/CounterContext';

export default function ProductsScreen() {
  const [cartItems, setCartItems] = useState([])
  const {count} = useContext(CounterContext)
  // Bu değişkenler, state yönetimi olmadan, sadece UI gösterimi için
  const searchQuery = '';
  const selectedCategory = 'Tümü';
  
  // Kategorileri ürün verilerinden çekelim
  const categories = ['Tümü', ...new Set(productsData.map(item => item.category || ''))];

  function addToCart(product: any){
    // Sepete ürün ekleme işlevi
    // Bu örnekte işlevsellik yok, sadece UI gösterimi için
    setCartItems([...cartItems, product])
  }

  console.log(cartItems);
  

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ürün ara..."
          value={searchQuery}
          editable={false} // Sadece UI gösterimi, işlevsellik yok
        />
      </View>
      <Text>{count}</Text>
      {/* Kategori Filtreleri */}
      <View style={styles.categoriesContainer}>
        <ScrollableCategories categories={categories} selected={selectedCategory} />
      </View>
      
      {/* Filtre ve Sıralama */}
      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={16} color="#2f95dc" />
          <Text style={styles.filterButtonText}>Filtrele</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="swap-vertical" size={16} color="#2f95dc" />
          <Text style={styles.filterButtonText}>Sırala</Text>
        </TouchableOpacity>
      </View>
      
      {/* Ürün Listesi */}
      <FlatList
        data={productsData.filter(item => item.id)}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ProductCard {...item} addToCart={addToCart} />
          </View>
        )}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}

// Yatay kaydırılabilir kategoriler bileşeni
function ScrollableCategories({ categories, selected }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[
            styles.categoryChip,
            selected === item && styles.categoryChipSelected
          ]}
        >
          <Text 
            style={[
              styles.categoryChipText,
              selected === item && styles.categoryChipTextSelected
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.categoryList}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  categoriesContainer: {
    marginTop: 16,
    height: 40,
  },
  categoryList: {
    paddingHorizontal: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipSelected: {
    backgroundColor: '#2f95dc',
  },
  categoryChipText: {
    color: '#666',
    fontSize: 14,
  },
  categoryChipTextSelected: {
    color: 'white',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#2f95dc',
    marginLeft: 4,
    fontSize: 14,
  },
  productList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  productItem: {
    marginBottom: 8,
  },
});