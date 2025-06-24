import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  const [fullName, setFullName] = useState('Ahmet Demir');

  useEffect(() => {
    console.log("component ilk yüklendiğinde ve deps. array'e göre çalışır!");
  }, [count]);

  return (
    <View>
      <Text>Counter: {count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
      <Text>Name: {fullName}</Text>
      <Button title="+" onPress={() => setFullName('Emin Başbayan')} />
      {/* <Button title='Reset' />
      <Button title='-' /> */}
    </View>
  );
}

export default Counter;
