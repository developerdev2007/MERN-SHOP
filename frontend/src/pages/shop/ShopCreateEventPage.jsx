import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import CreateEvent from "../../components/shop/CreateEvent";

const ShopCreateEventPage = () => {
  return (
    <>
      <div className="w-full bg-slate-100">
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
          <div className="w-16 800px:w-80 ">
            <DashboardSidebar active={6} />
          </div>
          <div className="flex justify-center w-full ">
            <CreateEvent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateEventPage;
