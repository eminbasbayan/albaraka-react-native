import { createContext, useState } from 'react';

export const CounterContext = createContext();

const CounterProvider = (props) => {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount(count + 1);
  }

  return (
    <CounterContext.Provider
      value={{
        fullName: 'Emin Başbayan',
        products: [],
        count,
        handleCount
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
