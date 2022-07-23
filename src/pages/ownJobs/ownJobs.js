import LoadingSpinner from "../../components/loading/loadingTable.component";
import Pagination from "../../components/paginateComponent/paginate.component"
import NotJobsFoundComponent from "../../components/ErrorComponents/NotJobsFound/NotJobsFound.component";
import useOwnJob from "../../hooks/useOwnJobs";
import OwnJobsComponent from "../../components/JobsComponents/ownJobs/ownJobs.component";

export default function OwnJobs() {
  const {
    loading,
    jobs,
    currentPage,
    setCurrentPage,
    currentTableData,
    PageSize,
  } = useOwnJob();

  if (loading) return <LoadingSpinner />;
  if (!currentTableData && !loading)
    return (
      <div className="List">
        <NotJobsFoundComponent
          message={"You dont have any job yet"}
          redMessage={"Add jobs"}
        />
      </div>
    );
  if (!currentTableData) return null;
  return (
    <div>
        return <OwnJobsComponent row={currentTableData} />;
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
