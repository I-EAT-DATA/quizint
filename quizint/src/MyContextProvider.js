import React, { createContext, useState } from "react";

export const MyContext = createContext();

function MyContextProvider({ children }) {
  const [cardData, setCardData] = useState(null);

  function updateCardData(newValue) {
    setCardData(newValue);
  }

  return (
    <MyContext.Provider value={{ cardData, setCardData: updateCardData }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
