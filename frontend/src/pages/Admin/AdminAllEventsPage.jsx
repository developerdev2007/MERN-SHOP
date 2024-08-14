import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllEvents from "../../components/AdminDashBoard/AdminAllEvents";

const AdminAllEventsPage = () => {
  console.log('adminAllEvents"Page"');

  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-[80px]">
            <AdminSideBar active={6} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllEventsPage;
