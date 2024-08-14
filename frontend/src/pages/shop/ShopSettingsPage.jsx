import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import ShopSettings from "../../components/ShopSettings";

const ShopSettingsPage = () => {
  return (
      <>
        <DashboardHeader />
        <div className="flex w-full h-full bg-slate-100">
          <div className="w-16 800px:w-80 ">
            <DashboardSidebar active={11} />
          </div>
          <ShopSettings />
        </div>
    </>
  );
};

export default ShopSettingsPage;
