import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { getAdminAllSellers } from "../../redux/actions/seller";
import { getAdminAllOrders } from "../../redux/actions/order";
import { Link } from "react-router-dom";

const AdminAllOrders = () => {
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
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((order) => {
      row.push({
        id: order._id,
        itemsQty: order.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "US$ " + order.totalPrice,
        status: order.status,
        createdAt: order?.createdAt.slice(0, 10),
      });
    });
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full p-10  mt-14 bg-slate-100">
          <h3 className="text-2xl font-Poppins pb-2 ">OverView</h3>
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

export default AdminAllOrders;
