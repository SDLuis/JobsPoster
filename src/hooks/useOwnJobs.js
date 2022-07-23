import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { deleteJobs } from "../services/job.service";
import jobContext from "../context/jobContext";

import { ownJobs } from "../services/job.service";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function UseOwnJobs() {
  let navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleted, setDeleted } = useContext(jobContext);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 8;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setLoading(true);
    setDeleted(false)
    ownJobs().then((response) => {
      setJobs(response);
      setLoading(false);
    });
    if (deleted) {
      return navigate("/jobs/owner");
    }
  }, [deleted, navigate, setDeleted]);

  function DeleteJob (Job_ID) {
    deleteJobs(Job_ID)
      .then((res) => {
        MySwal.fire({
          title: "Trabajo eliminado con exito",
          icon: "success",
          confirmButtonText: "Ok",
          allowEnterKey: true,
          allowEscapeKey: true,
          allowOutsideClick: true,
          timer: 3000,
          timerProgressBar: true,
        });
        setDeleted(true);
      })
      .catch((err) => {
        MySwal.fire({
          title: "Trabajo no eliminado",
          text: `Hubo un error al tratar de eliminar este trabajo, reintente mas tarde. Error: \n ${err.message}`,
          icon: "error",
          confirmButtonText: "Ok",
          allowEnterKey: true,
          allowEscapeKey: true,
          allowOutsideClick: true,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };
  return {jobs, loading, setCurrentPage, currentPage, currentTableData, DeleteJob, PageSize };
}
