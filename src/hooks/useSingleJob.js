import { useState, useEffect } from "react";
import { findJobs } from "../services/job.service";
import { useParams } from "react-router-dom";
import UseJobs from "./useJobs";

export default function UseSingleJobs() {
  const params = useParams();
  const Job_ID = params.Job_ID;

  const { jobs } = UseJobs();
  const jobsFromCache = jobs.find((singleJobs) => (singleJobs.Job_ID = Job_ID));

  const [job, setJob] = useState(jobsFromCache);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!job) {
      setLoading(true);
      findJobs(Job_ID)
        .then((response) => {
          if (!response) {
            setIsError(true);
          }
          setJob(response);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setIsError(true);
        });
    }
  }, [job, Job_ID]);

  return { job, loading, isError };
}
