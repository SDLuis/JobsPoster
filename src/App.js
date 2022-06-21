import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponents/navbar.component";

import LoginComponent from "./components/AuthComponents/login/login.component";
import RegisterComponent from "./components/AuthComponents/register/register.component";

import JobsListComponent from "./components/JobsComponents/jobList/jobList.component";
import JobsCategoryComponent from "./components/JobsComponents/jobCategory/jobCategory.component";
import PostJobsComponent from "./components/JobsComponents/postJob/postJob.component";
import FindJobsComponent from "./components/JobsComponents/findJobs/findJobs.component";
import OwnJobsComponent from "./components/JobsComponents/ownJobs/ownJobs.component";

function App() {
  return (
    
    <div>
      <section><NavbarComponent/></section>
      <BrowserRouter>
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
