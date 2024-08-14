import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllWithdrawRequest from "../../components/AdminDashBoard/AdminAllWithdrawRequest.jsx";

const AdminWithdrawRequestPage = () => {
  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-[80px]">
            <AdminSideBar active={7} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllWithdrawRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWithdrawRequestPage;
