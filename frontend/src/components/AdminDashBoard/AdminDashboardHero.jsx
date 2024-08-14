import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAllOrders } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAdminAllSellers } from "../../redux/actions/seller";
import { getAdminAllUsers } from "../../redux/actions/user";

const AdminDashboardHero = () => {
  const { adminOrders, isLoading } = useSelector((state) => state.orders);
  const { adminSellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminAllOrders());
    dispatch(getAdminAllSellers());
    // dispatch(getAdminAllUsers());
    console.log(adminSellers);
    // console.log(adminOrders);
  }, [dispatch]);
  console.log("AdminDashboardHero");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order At",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((order) => {
      row.push({
        id: order?._id,
        itemsQty: order?.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "US$ " + order?.totalPrice,
        status: order?.status,
        createdAt: order?.createdAt.slice(0, 10),
      });
    });
  ///!!!!---------------------------------------
  const adminEarning =
    adminOrders &&
    adminOrders?.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  // console.log(adminEarning);

  const adminBalance = adminEarning?.toFixed(2);
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full p-10  mt-14 bg-slate-100">
          <h3 className="text-2xl font-Poppins pb-2 ">OverView</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-[95%] 800px:w-[35%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg !mr-4  py-2 ">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2 cursor-pointer"
                  fill="#00000090   "
                />

                <h5
                  className={`${styles.productTitle} flex flex-wrap  !text-lg leading-4 !font-medium !text-black/60`}
                >
                  Total Earning
                </h5>
              </div>
              <h5 className="pt-2 text-2xl font-semibold pl-8">
                {adminBalance}
              </h5>
            </div>
            {/* //////////////////////////////////////////////////////////////////////// */}
            <div className="w-[95%] 800px:w-[35%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg !mr-4  py-2 ">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2 cursor-pointer"
                  fill="#00000090   "
                />
                <h5
                  className={`${styles.productTitle} !text-lg leading-4 !font-medium !text-black/60`}
                >
                  All Sellers
                </h5>
              </div>
              <h5 className="pt-2 text-2xl font-semibold pl-8">
                {adminSellers && adminSellers?.length}
              </h5>
              <Link to={"/admin-sellers"}>
                <h5 className="pt-4 pl-2 text-semibold text-emerald-500">
                  View Sellers
                </h5>
              </Link>
            </div>

            {/* ///////////////////////////////////////////////  */}
            <div className="w-[95%] 800px:w-[35%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg  py-2 ">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2 cursor-pointer"
                  fill="#00000090   "
                />

                <h5
                  className={`${styles.productTitle} !text-lg leading-4 !font-medium !text-black/60`}
                >
                  All Orders
                </h5>
              </div>
              <h5 className="pt-2 text-2xl font-semibold pl-8">
                {adminOrders && adminOrders?.length}
              </h5>
              <Link to={"/dashboard-products"}>
                <h5 className="pt-4 pl-2 text-semibold text-emerald-500">
                  View Orders
                </h5>
              </Link>
            </div>
          </div>
          <br />
          <h5 className="text-2xl font-semibold font-Poppins">Latest Orders</h5>

          <div className="w-full min-h-[43vh] shadow-sm shadow-yellow-500 bg-white/90">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={3}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardHero;
