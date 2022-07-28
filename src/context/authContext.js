import React, { useState, useContext } from "react";
import Cookies from "js-cookie";

const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJWT] = useState(
    () => Cookies.get('jwt2')
  );

  return (
    <authContext.Provider value={{jwt, setJWT}}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export default authContext
