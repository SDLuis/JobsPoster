import LoadingSpinnerComponent from "../../components/loading/loading.component";
import PaginationComponent from "../../components/paginateComponent/paginate.component";
import NotJobsFoundComponent from "../../components/ErrorComponents/NotJobsFound/NotJobsFound.component";
import SearchJobsComponent from "../../components/JobsComponents/searchJobs/searchajobs.component";
import JobsListComponent from "../../components/JobsComponents/listOfJobs/listOfJobs.component";

import UseJobs from "../../hooks/useJobs";

import "./home.css";

export default function Home() {
  const {
    jobs,
    loading,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
  } = UseJobs();

  return (
    <div>
      <div>
        <SearchJobsComponent />
      </div>
      {loading ? <LoadingSpinnerComponent /> : null}
      {jobs.length === 0 && !loading ? (
        <NotJobsFoundComponent
          message={"There are no jobs with this data, try to another."}
        />
      ) : null}
      <div className="Col">
        {currentTableData.map((row) => {
          return <JobsListComponent key={row.Job_ID} row={row} />;
        })}
      </div>
      <PaginationComponent
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
