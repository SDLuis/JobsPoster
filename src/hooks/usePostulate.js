import { useState } from "react";
import { postulate } from "../services/job.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function UsePostulate() {
  const [form, setForm] = useState({
    email: "",
    numberPhone: "",
    message: "",
    file: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSend, setEmailSend] = useState(false)

  const checkFilledFields = () => {
    if (
      form.email === "" ||
      form.numberPhone === "" ||
      form.message === "" ||
      form.file === ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (checkFilledFields()) {
      const body = new FormData();
      body.append("file", form.file);
      body.append("email", form.email);
      body.append("number", form.numberPhone);
      body.append("message", form.message);
      postulate(body)
        .then((res) => {
          setIsLoading(false);
          MySwal.fire({
            title: "Correo enviado",
            text: "El correo se ha enviado con exito, esperemos sea seleccionado",
            icon: "success",
            confirmButtonText: "OKE",
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 3000,
            timerProgressBar: true,
          });
          setEmailSend(true)
        })
        .catch((err) => {
          setIsLoading(false);
          MySwal.fire({
            title: "No se pudo enviar el correo, intentelo mas tarde",
            text: err,
            icon: "error",
            confirmButtonText: "OKE",
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 3000,
            timerProgressBar: true,
          });
        });
    } else {
      setIsLoading(false);
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
  };
  return { form, setForm, sendEmail, isLoading, emailSend };
}
