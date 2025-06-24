import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter({ count, arttir }) {

  // let counter = 0;

  console.log('Counter component rendered');

  

  return (
    <View>
      <Text>Counter: {count}</Text>
      <Button title="+" onPress={()=> arttir(10)} />
      {/* <Button title='Reset' />
      <Button title='-' /> */}
    </View>
  );
}

export default Counter;
