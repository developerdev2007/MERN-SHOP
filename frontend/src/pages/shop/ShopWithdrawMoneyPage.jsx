import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import ShopWithDrawMoney from "../../components/ShopWithDrawMoney";

const ShopWithdrawMoneyPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex item-center justify-between w-full h-full bg-slate-100">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={7} />
        </div>
        <ShopWithDrawMoney />
      </div>
    </>
  );
};

export default ShopWithdrawMoneyPage;
