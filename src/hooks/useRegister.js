import { useState } from "react";
import { register } from "../services/user.service";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function UseRegister() {

  const [registed, setRegisted] = useState(false);

  const Register = async (body) => {
   return await register(body)
      .then((response) => {
        if (response.message) {
          MySwal.fire({
            title: "Este email no esta disponible. Por favor intente con otro",
            icon: "error",
            confirmButtonText: true,
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 5000,
            timerProgressBar: true,
          });
        } else {
          MySwal.fire({
            title: "Registro exitoso, redirigiendo",
            icon: "success",
            confirmButtonText: true,
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 1000,
            timerProgressBar: true,
          });
          setRegisted(true);
        }
      })
      .catch((err) => {
        MySwal.fire({
          title: "No se pudo registrar, intente mas tarde",
          icon: "error",
          confirmButtonText: true,
          allowEnterKey: true,
          allowEscapeKey: true,
          allowOutsideClick: true,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  const failRegister = () => {
    return  MySwal.fire({
      title: "No se pudo registrar",
      text: "Rellene todos los campos",
      icon: "error",
      confirmButtonText: true,
      allowEnterKey: true,
      allowEscapeKey: true,
      allowOutsideClick: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  return { Register, isRegister: Boolean(registed), failRegister };
}
