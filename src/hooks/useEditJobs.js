import * as jobService from "../services/job.services";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function EditJob() {
    
  let navigate = useNavigate();

  function editJobsDone(Job_ID, formData) {
    return jobService
      .editJobs(Job_ID, formData)
      .then((res) => {
        let serverResponse = res.status;
        if (serverResponse === 200) {
          MySwal.fire({
            title: "Se editado el trabajo correctamente",
            icon: "success",
            confirmButtonText: "OKE",
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 1500,
            imerProgressBar: true,
          });
          setTimeout(() => navigate("/jobs/owner"), 2000);
        } else {
          MySwal.fire({
            title: "Trabajo no editado",
            text: "No se ha hecho ningun cambio a los datos",
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
  }

  function editJobsFail() {
    return MySwal.fire({
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

  return { editJobsDone, editJobsFail };
}
