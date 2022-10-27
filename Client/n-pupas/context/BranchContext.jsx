import React, { useContext, createContext, useState, useMemo, useEffect } from 'react';
import { branchCookie } from 'constants/data';
import { getCookie, setCookies } from 'cookies-next';

export const BranchContext = createContext(null);

export const BranchContextProvider = ({ children }) => {
  const [branchID, setBranchID] = useState(getCookie(branchCookie));

  useEffect(() => {
    setCookies(branchCookie, branchID);
  }, [branchID]);

  const values = useMemo(
    () => ({
      branchID,
      setBranchID,
    }),
    [branchID]
  );

  return <BranchContext.Provider value={values}>{children}</BranchContext.Provider>;
};

export function useBranchContext() {
  const context = useContext(BranchContext);

  if (!context) {
    console.error('An error has occurred');
  }
  return context;
}

export default useBranchContext;
