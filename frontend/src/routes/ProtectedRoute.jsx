import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  console.log({ isAuthenticated, isLoading });
  const location = useLocation();
  // console.log({ location });

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated && location.pathname === "/login") {
      return <Navigate to="/login" replace />;
    } else if (!isAuthenticated && location.pathname === "/sign-up") {
      return <Navigate to="/sign-up" replace />;
    } else {
      // return <Navigate to={location.pathname} replace />;
      return children;
    }
  }
};

export default ProtectedRoute;
