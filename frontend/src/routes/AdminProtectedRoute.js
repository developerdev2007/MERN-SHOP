import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.user
  );
  console.log({ user });
  const location = useLocation();
  // if (isLoading === false) {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" replace />;
  //   } else if (user.role !== "Admin") {
  //     return <Navigate to="/" />;
  //   }
  //   return children;
  // }
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated && location.pathname === "/login") {
      return <Navigate to="/login" replace />;
    } else if (!isAuthenticated && location.pathname === "/sign-up") {
      return <Navigate to="/sign-up" replace />;
    } else if (user && user?.role !== "Admin") {
      return <Navigate to="/" />;
    } else {
      // return <Navigate to={location.pathname} replace />;
      return children;
    }
  }
};

export default AdminProtectedRoute;
