import JobsById from "../../components/JobsComponents/singleJobs/singleJobs.component";
import LoadingSpinner from "../../components/loading/loadingSingle.component"
import NotJobsFoundComponent from "../../components/ErrorComponents/NotJobsFound/NotJobsFound.component";

import UseSingleJobs from "../../hooks/useSingleJob";

export default function Details() {

  const { job, loading, isError } = UseSingleJobs();

  if (loading) return <LoadingSpinner />;
  if (isError) return <NotJobsFoundComponent redMessage={'Go to home'} />;
  if (!job) return null

  return <JobsById key={job.Job_ID} row={job} />;
}
