import ProductCard from '@/components/ProductCard';
import MyFunc, { productsData, newArray } from '@/constants/data';
import { FlatList, View } from 'react-native';



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
      <FlatList
       data={productsData}
       keyExtractor={(item, index)=> index.toString()}
       showsVerticalScrollIndicator={false}
       renderItem={({item})=> {
        return <ProductCard key={item.id} {...item} />
       }}
      />
      
    </View>
  );
}
