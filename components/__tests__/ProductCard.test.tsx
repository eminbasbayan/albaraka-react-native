import { CartContext } from '@/context/CartContext';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProductCard from '../ProductCard';

// Redux'u mock etmek için
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

describe('ProductCard Component', () => {
  // Test için örnek ürün verileri
  const mockProduct = {
    id: 1,
    title: 'Test Ürün',
    price: 129.99,
    description: 'Bu bir test ürünüdür',
    category: 'elektronik',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  };
  
  // addToCart mock fonksiyonu
  const mockAddToCart = jest.fn();

  // Test düzeni - CartContext Provider ile sarma
  const renderWithContext = (component) => {
    return render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        {component}
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    // Her test öncesi mock fonksiyonu sıfırla
    mockAddToCart.mockClear();
  });

  it('renders product details correctly', () => {
    const { getByText, getByTestId } = renderWithContext(
      <ProductCard {...mockProduct} />
    );

    // Ürün başlığının doğru görüntülendiğini kontrol et
    expect(getByText('Test Ürün')).toBeTruthy();
    
    // Ürün fiyatının doğru görüntülendiğini kontrol et
    expect(getByText('129.99₺')).toBeTruthy();
    
    // Ürün açıklamasının doğru görüntülendiğini kontrol et
    expect(getByText('Bu bir test ürünüdür')).toBeTruthy();
    
    // Ürün kategorisinin doğru görüntülendiğini kontrol et
    expect(getByText('elektronik')).toBeTruthy();
  });

  it('calls addToCart with product when button is pressed', () => {
    const { getByText } = renderWithContext(
      <ProductCard {...mockProduct} />
    );

    // Sepete Ekle butonunu bul ve tıkla
    const addButton = getByText('Sepete Ekle');
    fireEvent.press(addButton);

    // addToCart fonksiyonunun çağrıldığını kontrol et
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    
    // addToCart fonksiyonunun doğru ürünle çağrıldığını kontrol et
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Ürün',
      price: 129.99,
      description: 'Bu bir test ürünüdür',
      category: 'elektronik',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    });
  });
});