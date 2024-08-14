import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";

import CreateProduct from "../../components/shop/CreateProduct";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";

const ShopCreateProductPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={4} />
        </div>
        <div className="flex justify-center w-full ">
          <CreateProduct />
        </div>
      </div>
    </>
  );
};

export default ShopCreateProductPage;
