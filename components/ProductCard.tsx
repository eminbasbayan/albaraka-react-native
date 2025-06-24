import { Image, Text, View } from 'react-native';
import Button from './Button';

interface ProductCardProps {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}

function ProductCard({
  title,
  image,
  description,
  price,
  category,
}: ProductCardProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
        margin: 10,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'cover',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#666',
          marginVertical: 4,
        }}
      >
        {description}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {price}₺
      </Text>
      <Text
        style={{
          color: '#999',
          fontStyle: 'italic',
          marginBottom: 6
        }}
      >
        {category}
      </Text>

      <Button title="Sepete Ekle" onPress={()=> {}} variant='outline' />
    </View>
  );
}

export default ProductCard;
