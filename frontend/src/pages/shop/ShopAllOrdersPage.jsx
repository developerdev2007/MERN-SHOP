import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import AllOrders from "../../components/shop/AllOrders";

const ShopAllOrdersPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={2} />
        </div>
        <div className="flex justify-center w-full ">
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default ShopAllOrdersPage;
