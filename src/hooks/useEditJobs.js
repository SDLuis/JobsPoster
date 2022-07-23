import * as jobService from "../services/job.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const MySwal = withReactContent(Swal);

export default function EditJob() {

  const params = useParams();
  const Job_ID = params.Job_ID;

  const [formData, setFormData] = useState({
    workTitle: "",
    Position: "",
    workType: "",
    applyMethod: "",
    description: "",
  });

  useEffect(() => {
    jobService.findJobs(Job_ID).then((job) => {
      setFormData({
        ...formData,
        workTitle: job.work_Title,
        Position: job.Position,
        workType: job.workType,
        applyMethod: job.apply_Method,
        description: job.description,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Job_ID]);

  function checkFilledFields() {
    if (
      formData.workTitle === "" ||
      formData.Position === "" ||
      formData.workType === "Select work type" ||
      formData.applyMethod === "" ||
      formData.description === ""
    ) {
      return false;
    } else {
      return true;
    }
  }
    
  let navigate = useNavigate();

  function editJobsDone(formData) {
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
            timer: 2000,
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

  return { editJobsDone, editJobsFail, formData, setFormData, checkFilledFields };
}
