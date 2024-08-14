import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import AllCoupons from "../../components/shop/AllCoupons";

const ShopAllCouponsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={9} />
        </div>
        <div className="flex justify-center w-full ">
          <AllCoupons />
        </div>
      </div>
    </>
  );
};

export default ShopAllCouponsPage;
