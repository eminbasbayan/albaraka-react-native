import React from 'react';
import MyParagraph from './MyParagraph';

const MyElement = ({ show }) => {
  console.log('MyElement re-rendered!');

  return <MyParagraph>{show && 'My Element'}</MyParagraph>;
};

const MemoizedMyElement = React.memo(MyElement);

export default MemoizedMyElement;
