import { useState } from "react";
import Swal from "sweetalert2";
import * as jobService from "../services/job.service";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function usePostJobs() {
  const [formData, setFormData] = useState({
    workTitle: "",
    Position: "",
    workType: "",
    applyMethod: "",
    description: "",
  });

  function checkFilledFields() {
    if (
      formData.workTitle === "" ||
      formData.Position === "" ||
      formData.workType === "" ||
      formData.applyMethod === "" ||
      formData.description === ""
    ) {
      return false;
    } else {
      return true;
    }
  }
  function postJob() {
    if (checkFilledFields() === true) {
      jobService
        .postJob(formData)
        .then((res) => {
          let serverResponse = res.status;
          if (serverResponse === 200) {
            MySwal.fire({
              title: "Se añadio el trabajo correctamente",
              icon: res.data.icon,
              confirmButtonText: "OKE",
              allowEnterKey: true,
              allowEscapeKey: true,
              allowOutsideClick: true,
              timer: 1500,
              imerProgressBar: true,
            });
          } else {
            MySwal.fire({
              title: "Trabajo no publicado",
              text: res.data,
              icon: "error",
              confirmButtonText: "OKE",
              allowEnterKey: true,
              allowEscapeKey: true,
              allowOutsideClick: true,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      MySwal.fire({
        title: "Trabajo no publicado",
        text: "Rellene todos los campos y asegurese de haber cliqueado bien la categoria y el tipo de trabajo que tiene",
        icon: "error",
        confirmButtonText: "Ok",
        allowEnterKey: true,
        allowEscapeKey: true,
        allowOutsideClick: true,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }

  return { formData, setFormData, checkFilledFields, postJob };
}
