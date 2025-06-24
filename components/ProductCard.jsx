import { Image, Text, View } from 'react-native';

function ProductCard() {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
      }}
    >
      <Image
        source={{
          uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 8,
        }}
      >
        Ürün Adı
      </Text>
      <Text
        style={{
          color: '#666',
          marginVertical: 4,
        }}
      >
        Ürün Açıklaması
      </Text>
      <Text
       style={{
        fontSize: 16,
        fontWeight: "bold",

       }}
      >100₺</Text>
      <Text
      style={{
        color: "#999",
        fontStyle: "italic"
      }}
      >Ürün Kategorisi</Text>
    </View>
  );
}

export default ProductCard;
