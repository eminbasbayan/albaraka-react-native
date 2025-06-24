import { useState } from "react";
import Counter from "@/components/Counter";
import { Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(20);

  console.log("Index component rendered");
  
function arttir(newValue: number) {
    // count += 1;
    setCount(count + newValue)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Counter count={count} arttir={arttir} />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
