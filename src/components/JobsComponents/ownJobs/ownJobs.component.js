import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "react-bootstrap";
import "./ownJobs.css";

import { ownJobs } from "../../../services/job.service";
import LoadingSpinner from "../../loading/loading.component";
import Pagination from "../../paginateComponent/paginate.component";
import renderJobs from "../../../hooks/useOwnJobs";

import jobContext from "../../../context/jobContext";

export default function OwnJobs() {
  let navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { deleted, setDeleted } = useContext(jobContext)
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setDeleted(false);
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
  return (
    <div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
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
        <tbody>{renderJobs(currentTableData)}</tbody>
      </Table>
    </div>
    </div>
  );
}
