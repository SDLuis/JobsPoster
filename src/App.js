import "./styles/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import JobsListComponent from "./components/jobList/jobList.component";
import JobsCategoryComponent from "./components/jobCategory/jobCategory.component";
import LoginComponent from "./components/login/login.component";
import RegisterComponent from "./components/register/register.component";
import PostJobsComponent from "./components/postJob/postJob.component";

function App() {
  return (
    <div className="List">
      <BrowserRouter>
        <Link to="/category/Full Time">Change to Full Time</Link>
        <Link to="/category/Part Time">Change to Part Time</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/jobs/add">Add job</Link>
        <Routes>
          <Route path="/" element={<JobsListComponent />} />
          <Route path="/jobs/add" element={<PostJobsComponent />} />
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
