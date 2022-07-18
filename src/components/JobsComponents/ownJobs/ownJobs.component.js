import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "react-bootstrap";
import "./ownJobs.css";

import { ownJobs } from "../../../services/job.service";
import jobContext from "../../../context/jobContext";

import LoadingSpinner from "../../loading/loadingTable.component";
import Pagination from "../../paginateComponent/paginate.component";
import RenderJobs from "../../../hooks/useOwnJobs";
import NotJobsFoundComponent from "../../ErrorComponents/NotJobsFound/NotJobsFound.component";

export default function OwnJobs() {
  let navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleted, setDeleted } = useContext(jobContext)
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 8;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setLoading(true);
    ownJobs().then((response) => {
      setJobs(response);
      setLoading(false);
    });
    if (deleted) {
      return navigate("/jobs/owner");
    }
  }, [deleted, navigate, setDeleted]);

  if (loading) return <LoadingSpinner />;
  if(jobs.length === 0 && !loading) return <div className="List"><NotJobsFoundComponent message={'You dont have any job yet'} redMessage={'Add jobs'} /></div>
  return (
    <div className="ownJobs">
    <div className="List">
      <Table size="sm" variant="dark" striped hover>
        <thead>
          <tr>
            <td>ID</td>
            <td>Titulo</td>
            <td>Tipo</td>
            <td>Ubicacion</td>
            <td>Posicion</td>
            <td>Opciones</td>
          </tr>
        </thead>
        <tbody>{RenderJobs(currentTableData)}</tbody>
      </Table>
    </div>
    <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}
