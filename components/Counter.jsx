import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter({ count, setCount, fullName }) {

  // let counter = 0;

  console.log('Counter component rendered');

  function arttir() {
    // count += 1;
    setCount(count + 1)
  }

  return (
    <View>
      <Text>Counter: {count}</Text>
      <Button title="+" onPress={arttir} />
      {/* <Button title='Reset' />
      <Button title='-' /> */}
    </View>
  );
}

export default Counter;
