import axios from "axios";

export const getWorks = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/jobs`)
    .then((response) => {
      return response.data;
    });
};

export const getWorksCategory = async (category) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/jobs/${category}/list`)
    .then((response) => {
      return response.data;
    });
};

export const postJob = async (body) => {
  return await axios
    .post(
      `${process.env.REACT_APP_API_URL}/jobs/add`,
      {
        work_Title: body.workTitle,
        Position: body.Position,
        apply_Method: body.applyMethod,
        workType: body.workType,
        description: body.description,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    });
};

export const findJobs = async (Job_ID) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/jobs/${Job_ID}`)
    .then((response) => {
      return response.data;
    });
};

export const ownJobs = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/jobs/owner`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};

export const editJobs = async (Job_ID, body) => {
  return await axios
    .put(
      `${process.env.REACT_APP_API_URL}/jobs/edit/${Job_ID}`,
      {
        work_Title: body.workTitle,
        Position: body.Position,
        apply_Method: body.applyMethod,
        workType: body.workType,
        description: body.description,
      },
      { withCredentials: true }
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteJobs = async (Job_ID) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/jobs/delete/${Job_ID}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
