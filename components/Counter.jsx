import { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter() {
  const countRef = useRef(0);
  const [, forceUpdate] = useState(0);
  // const [count, setCount] = useState(0);

  function arttir() {
    countRef.current++;
    console.log(countRef.current);
    forceUpdate((n) => n + 1);
  }

  console.log('component re-rendered!');

  return (
    <View>
      <Button title="+" onPress={arttir} />
      <Text>{countRef.current}</Text>
      <Button title="-" onPress={() => {}} />
      {/* <Button title='Reset' />
      <Button title='-' /> */}
    </View>
  );
}

export default Counter;
