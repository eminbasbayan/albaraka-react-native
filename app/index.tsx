import Button from '@/components/Button';
import { productsData } from '@/constants/data';
import { View } from 'react-native';

export default function Index() {
  console.log(productsData);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        title={'Sepete Ekle'}
        onPress={() => console.log('Sepete Eklendi!')}
        loading={true}
      />

      <Button title="İptal" onPress={() => {}} variant="secondary" />

      <Button title="Detaylar" onPress={() => {}} variant="outline" />
      <Button title="Satın Al" onPress={() => {}} disabled={true} />

      <Button title="Giriş Yap" onPress={() => {}} fullWidth />

      {/* <FlatList
       data={productsData}
       keyExtractor={(item, index)=> index.toString()}
       showsVerticalScrollIndicator={false}
       renderItem={({item})=> {
        return <ProductCard key={item.id} {...item} />
       }}
      /> */}
    </View>
  );
}
