import React, { createContext, useState } from 'react';

export const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // 0 to 100

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
