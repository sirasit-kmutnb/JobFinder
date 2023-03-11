import { getRole, getToken } from "../services/authorize";
import { Navigate } from "react-router-dom";

const CompanyRoute = ({ children }) => {
  if (getRole() !== "Company" || !getToken()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default CompanyRoute;
