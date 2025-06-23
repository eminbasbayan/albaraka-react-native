import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter() {
  const [count, setCount] = useState(20);

  // let counter = 0;

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
