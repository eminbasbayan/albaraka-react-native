import React from 'react';
import { Button } from 'react-native';

const MyButton = ({ onPress }) => {
  console.log('MyButton re-rendered!');
  return <Button onPress={onPress} title="MyButton" />;
};

export default MyButton;
