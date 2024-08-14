import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import DashboardHero from "../../components/shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex w-full bg-slate-100">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={1} />
        </div>
        <DashboardHero />
      </div>
    </>
  );
};

export default ShopDashboardPage;
