import "./styles/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import JobsListComponent from "./components/JobsComponents/jobList/jobList.component";
import JobsCategoryComponent from "./components/JobsComponents/jobCategory/jobCategory.component";
import LoginComponent from "./components/AuthComponents/login/login.component";
import RegisterComponent from "./components/AuthComponents/register/register.component";
import PostJobsComponent from "./components/JobsComponents/postJob/postJob.component";
import FindJobsComponent from "./components/JobsComponents/findJobs/findJobs.component";
import OwnJobsComponent from "./components/JobsComponents/ownJobs/ownJobs.component";

function App() {
  return (
    <div className="List">
      <BrowserRouter>
        <Link to="/category/Full Time">Change to Full Time</Link>
        <Link to="/category/Part Time">Change to Part Time</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/jobs/add">Add job</Link>
        <Link to="/jobs/owner">Owner Jobs</Link>
        <Routes>
          <Route path="/" element={<JobsListComponent />} />
          <Route path="/jobs/add" element={<PostJobsComponent />} />
          <Route path="/jobs/owner" element={<OwnJobsComponent />} />
          <Route path="/jobs/:Job_ID/Details" element={<FindJobsComponent />} />
          <Route
            path="/category/:category"
            element={<JobsCategoryComponent />}
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
