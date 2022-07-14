import { useContext, useCallback } from "react";
import Cookies from "js-cookie";
import authContext from "../context/authContext";
import { Login } from "../services/user.service"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function useUser() {
  const { jwt, setJWT } = useContext(authContext);

  const login = useCallback(
    ({ useremail, password }) => {
      return Login(useremail, password)
        .then((res) => {
          if (res.message) {
            MySwal.fire({
              title: "Error al validar los datos",
              text: res.message,
              icon: "error",
              confirmButtonText: "OKE",
              allowEnterKey: true,
              allowEscapeKey: true,
              allowOutsideClick: true,
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            setJWT(res.data);
            Cookies.set("jwt", `${res.data}`, { expires: 7 });
          }
        })
        .catch((err) => {
          console.log(err)
          MySwal.fire({
            title: "No se pudo Logear, intente mas tarde",
            icon: "error",
            confirmButtonText: true,
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 2000,
            timerProgressBar: true,
          });
        });
    },
    [setJWT]
  );
  const failLogin = () => {
    MySwal.fire({
      title: "Error al validar los datos",
      text: "Rellene todos los campos",
      icon: "error",
      confirmButtonText: "OKE",
      allowEnterKey: true,
      allowEscapeKey: true,
      allowOutsideClick: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }
  const logout = useCallback(() => {
    Cookies.remove("jwt");
    setJWT(null)
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    failLogin
  };
}
