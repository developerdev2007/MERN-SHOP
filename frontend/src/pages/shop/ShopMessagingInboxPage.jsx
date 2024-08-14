import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import DashboardInbox from "../../components/shop/DashboardInbox";

const ShopMessagingInboxPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex w-full bg-slate-100">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={8} />
        </div>
        <DashboardInbox />
      </div>
    </>
  );
};

export default ShopMessagingInboxPage;
