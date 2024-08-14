import React from "react";
import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import DashboardSidebar from "../../components/ShopDashboard/layout/DashboardSidebar";
import AllProducts from "../../components/shop/AllProducts.jsx";

const ShopAllProductPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full bg-slate-200 ">
        <div className="w-16 800px:w-80 ">
          <DashboardSidebar active={3} />
        </div>
        <div className="flex justify-center w-full ">
          <AllProducts />
        </div>
      </div>
    </>
  );
};

export default ShopAllProductPage;
