import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllOrders from "../../components/AdminDashBoard/AdminAllOrders";

const AdminAllOrdersPage = () => {
  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-max">
            <AdminSideBar active={2} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllOrders />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllOrdersPage;
