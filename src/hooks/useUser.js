import { useContext, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import authContext from "../context/authContext";

export default function useUser() {
  const { jwt, setJWT } = useContext(authContext);

  const login = useCallback(
    ({ userEmail, password }) => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          {
            email: userEmail,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.message) {
          } else {
            setJWT(response.data.data);
            Cookies.set("jwt", `${response.data.data}`, { expires: 7 });
          }
        });
    },
    [setJWT]
  );
  const logout = useCallback(() => {
    Cookies.remove("jwt");
    setJWT(null)
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
