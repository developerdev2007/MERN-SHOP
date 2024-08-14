import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import AllRefunds from "../../components/shop/AllRefunds.jsx";

const ShopAllRefundPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={10} />
        </div>
        <div className="flex justify-center w-full ">
          <AllRefunds />
        </div>
      </div>
    </>
  );
};

export default ShopAllRefundPage;
