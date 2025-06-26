import React, { useEffect } from 'react';
import { Text } from 'react-native';

const MyParagraph = (props) => {
  console.log('MyParagraph re-rendered!');

  return <Text>{props.children}</Text>;
};

const MemoizedMyParagraph = React.memo(MyParagraph);

export default MemoizedMyParagraph;
