import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { arttir, azalt } from '@/redux/counterSlice';
import { clearCart, deleteFromCart } from '@/redux/cartSlice';

export default function CartScreen() {
  const { handleClearCart } = useContext(CartContext);
  const { cartItems } = useSelector((state) => state.cart);
  const { count, total: myTotalInfo } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  console.log('redux-toolkit', count);
  console.log('redux-toolkit', myTotalInfo);

  // Sepette gösterilecek örnek ürünler (ilk 2 ürün)

  // Toplam fiyat hesaplama - statik
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  // Sepet boş durumu kontrolü
  const isCartEmpty = cartItems.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyCartText}>Sepetiniz boş</Text>
          <Text style={styles.emptyCartSubtext}>
            Sepetinizde henüz ürün bulunmuyor.
          </Text>
          <Button
            title="Alışverişe Başla"
            onPress={() => {}}
            variant="primary"
            style={styles.shopButton}
          />
          <Button
            title="Arttır"
            onPress={() => dispatch(arttir())}
            variant="primary"
            style={styles.shopButton}
          />
          <Button
            title="Azalt"
            onPress={() => dispatch(azalt())}
            variant="primary"
            style={styles.shopButton}
          />
          <Text>{count}</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartItemsContainer}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                deleteFromCart={deleteFromCart}
                dispatch={dispatch}
              />
            ))}
          </ScrollView>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ara Toplam</Text>
              <Text style={styles.summaryValue}>{subtotal.toFixed(2)}₺</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Kargo</Text>
              <Text style={styles.summaryValue}>{shipping.toFixed(2)}₺</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Toplam</Text>
              <Text style={styles.totalValue}>{total.toFixed(2)}₺</Text>
            </View>

            <Button
              title="Siparişi Tamamla"
              onPress={()=> dispatch(clearCart())}
              variant="primary"
              fullWidth
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

// Sepet öğesi bileşeni
function CartItem({ item, deleteFromCart, dispatch }) {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cartItemPrice}>{item.price}₺</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(deleteFromCart(item.id))}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  shopButton: {
    marginTop: 16,
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
});
