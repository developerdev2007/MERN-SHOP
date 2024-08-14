import AdminHeader from "../../components/AdminDashBoard/AdminHeader";
import AdminSideBar from "../../components/AdminDashBoard/AdminSideBar";
import AdminAllProducts from "../../components/AdminDashBoard/AdminAllProducts";

const AdminAllProductsPage = () => {
  console.log('adminAllUsers"Page"');

  return (
    <>
      <div className="">
        <AdminHeader />
        <div className="w-full flex ">
          <div className="800px:w-[18%] w-[80px]">
            <AdminSideBar active={5} />
          </div>
          <div className="800px:w-[80%] w-[88%]">
            <AdminAllProducts />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllProductsPage;
