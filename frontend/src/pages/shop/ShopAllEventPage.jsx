import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import AllEvents from "../../components/shop/AllEvents.jsx";

const ShopAllEventPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={5} />
        </div>
        <div className="flex justify-center w-full ">
          <AllEvents />
        </div>
      </div>
    </>
  );
};

export default ShopAllEventPage;
