import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { JobProvider } from "./context/jobContext";

import PrivateRoute from "./hooks/privateRoutes";

import NavbarComponent from "./components/NavbarComponents/navbar.component";

import NotFoundComponent from "./components/ErrorComponents/404/404.component"

import LoginComponent from "./components/AuthComponents/login/login.component";
import RegisterComponent from "./components/AuthComponents/register/register.component";

import PostJobsComponent from "./components/JobsComponents/postJob/postJob.component";
import OwnJobsComponent from "./pages/ownJobs/ownJobs";
import EditJobsComponent from "./components/JobsComponents/editJob/editJobs.component";
import PostulateComponent from "./components/JobsComponents/postulate/postulate.component";

import Home from "./pages/home/home";
import Details from "./pages/details/details";

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
            <Route path="/" element={<Home />} />
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
              element={<Details />}
            />
            <Route
              path="/jobs/:Job_ID/edit"
              element={<EditJobsComponent />}
            />
            <Route path="/jobs/:Job_ID/postulate" element={<PostulateComponent />} />

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
