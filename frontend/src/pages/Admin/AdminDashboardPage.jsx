import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminDashboardHero from "../../components/AdminDashBoard/AdminDashboardHero";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminDashboardPage = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  if (!isLoading) {
    if (!isAuthenticated) {
      <Navigate to="/login" />;
    }
  }
  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-max">
            <AdminSideBar active={1} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminDashboardHero />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
