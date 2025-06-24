import { Modal, Text, View } from 'react-native';
import Button from './Button';
import { useEffect, useState } from 'react';

function CounterModal({ visible, onClose }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('component ilk yüklendiğinde çalışır!');

    let i = 0;

    const id = setInterval(() => {
      i += 1;
      setCounter(i);
      console.log(`Sayaç: ${i}`);
    }, 1000);

    // clean-up function
    return () => {
      console.log('component ekrandan kaldırıldığında çalışır!');

      clearInterval(id);
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 20,
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Modal Sayacı: {counter}
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            Bu sayaç, modal kapatıldığında da arkaplanda çalışmaya devam edecek.
            Console`u kontrol edin!
          </Text>
          <Button title="Modalı Kapat" onPress={onClose} variant="primary" />
        </View>
      </View>
    </Modal>
  );
}

export default CounterModal;
