import React, { createContext, useState } from "react";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}
