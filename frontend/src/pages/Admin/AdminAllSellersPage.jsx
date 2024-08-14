import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllSellers from "../../components/AdminDashBoard/AdminAllSellers";

const AdminAllSellersPage = () => {
  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-[80px]">
            <AdminSideBar active={3} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllSellers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllSellersPage;
