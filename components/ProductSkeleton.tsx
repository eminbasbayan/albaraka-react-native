import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ProductSkeleton() {
  // Animasyon değeri
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Component yüklendiğinde animasyonu başlat
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulse.start();

    // Component kaldırıldığında animasyonu durdur
    return () => {
      pulse.stop();
    };
  }, []);

  // Opacity değeri için interpolasyon
  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View style={styles.container}>
      {/* Ürün Görseli Skeleton */}
      <Animated.View style={[styles.image, { opacity }]} />
      
      {/* Başlık Skeleton */}
      <Animated.View style={[styles.title, { opacity }]} />
      
      {/* Açıklama Skeleton */}
      <Animated.View style={[styles.description, { opacity }]} />
      <Animated.View style={[styles.description, { opacity, width: '70%' }]} />
      
      {/* Fiyat Skeleton */}
      <Animated.View style={[styles.price, { opacity }]} />
      
      {/* Kategori Skeleton */}
      <Animated.View style={[styles.category, { opacity }]} />
      
      {/* Buton Skeleton */}
      <Animated.View style={[styles.button, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  title: {
    height: 22,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    borderRadius: 4,
    width: '70%',
  },
  description: {
    height: 16,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
    borderRadius: 4,
  },
  price: {
    height: 20,
    backgroundColor: '#e0e0e0',
    width: '30%',
    marginTop: 10,
    borderRadius: 4,
  },
  category: {
    height: 16,
    backgroundColor: '#e0e0e0',
    width: '40%',
    marginTop: 6,
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    height: 42,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 8,
  },
});