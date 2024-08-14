import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllUsers from "../../components/AdminDashBoard/AdminAllUsers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminAllOrders } from "../../redux/actions/order";
import { getAdminAllUsers } from "../../redux/actions/user";

const AdminAllUsersPage = () => {
  console.log('adminAllUsers"Page"');
 

  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-[80px]">
            <AdminSideBar active={4} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllUsers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllUsersPage;
