import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponents/navbar.component";

import { AuthProvider } from "./context/authContext";
import { JobProvider } from "./context/jobContext";

import PrivateRoute from "./hooks/privateRoutes";

import NotFoundComponent from "./components/ErrorComponents/404/404.component"

import LoginComponent from "./components/AuthComponents/login/login.component";
import RegisterComponent from "./components/AuthComponents/register/register.component";

import JobsListComponent from "./components/JobsComponents/jobList/jobList.component";
import PostJobsComponent from "./components/JobsComponents/postJob/postJob.component";
import FindJobsComponent from "./components/JobsComponents/findJobs/findJobs.component";
import OwnJobsComponent from "./components/JobsComponents/ownJobs/ownJobs.component";
import EditJobsComponent from "./components/JobsComponents/editJob/editJobs.component";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
      <div>
        <section>
          <NavbarComponent />
        </section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JobsListComponent />} />
            <Route
              path="/jobs/add"
              element={
                <PrivateRoute>
                  <PostJobsComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/owner"
              element={
                <PrivateRoute>
                  <OwnJobsComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/:Job_ID/Details"
              element={<FindJobsComponent />}
            />
            <Route
              path="/jobs/:Job_ID/edit"
              element={<EditJobsComponent />}
            />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/:rest*" element={<NotFoundComponent/ >} />
          </Routes>
        </BrowserRouter>
      </div>
      </JobProvider>
    </AuthProvider>
  );
}
export default App;
