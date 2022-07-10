import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import authContext from "../context/authContext";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const { jwt } = useContext(authContext) 
  
  if (!jwt) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
