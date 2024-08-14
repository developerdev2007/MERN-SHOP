import React from "react";
import DashboardHeader from "../../components/ShopDashboard/layout/DashboardHeader";
import Footer from "../../components/Layout/Footer";

import OrderDetails from "../../components/shop/OrderDetails";
const ShopOrderDetailsPage = () => {
  return (
    <>
      <DashboardHeader />
      <OrderDetails />
      <Footer />{" "}
    </>
  );
};

export default ShopOrderDetailsPage;
