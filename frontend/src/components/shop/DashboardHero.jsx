import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.product);
  const [deliverOrder, setDeliverOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));

    const orderData =
      orders && orders?.filter((item) => item.status === "Delivered");
    setDeliverOrder(orderData);
  }, [dispatch]);

  // const totalEarningWithoutTax = deliverOrder
  //   ? deliverOrder.reduce((acc, item) => acc + item.totalPrice, 0)
  //   : 0;

  // const serviceCharge = totalEarningWithoutTax
  //   ? totalEarningWithoutTax * 0.1
  //   : 0;

  const availableBalance = seller?.availBalance;

  ////////////////////////////////////////

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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      {!isLoading ? (
        <>
          <div className="w-full p-8 mt-8 bg-slate-100">
            <h3 className="text-2xl font-Poppins pb-2 ">OverView</h3>
            <div className="w-full block 800px:flex items-center justify-between">
              <div className="w-full 800px:w-[40%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg !mr-4 px-3 py-4 ">
                <div className="flex items-center">
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2 cursor-pointer"
                    fill="#00000090   "
                  />

                  <h5
                    className={`${styles.productTitle} flex flex-wrap  !text-lg leading-4 !font-medium !text-black/60`}
                  >
                    Account Balance
                    <span className="text-base sm:text-xs text-wrap ">
                      (with 10% service balance)
                    </span>
                  </h5>
                </div>
                <h5 className="pt-2 text-2xl font-semibold pl-8">
                  ${availableBalance ? availableBalance : 0}
                </h5>
                <Link to={"/dashboard-withdraw-money"}>
                  <h5 className="pt-4 pl-2 text-semibold text-emerald-500">
                    WithDraw Money
                  </h5>
                </Link>
              </div>
              {/* //////////////////////////////////////////////////////////////////////// */}
              <div className="w-full 800px:w-[40%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg !mr-4  py-5 ">
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
                  {orders && orders?.length}
                </h5>
                <Link to={"/dashboard-orders"}>
                  <h5 className="pt-4 pl-2 text-semibold text-emerald-500">
                    View Orders
                  </h5>
                </Link>
              </div>

              {/* ///////////////////////////////////////////////  */}
              <div className="w-full 800px:w-[40%] m-4 mx-auto min-h-[20vh] bg-white/95 shadow-sm shadow-teal-500 rounded-lg  py-5 ">
                <div className="flex items-center">
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2 cursor-pointer"
                    fill="#00000090   "
                  />

                  <h5
                    className={`${styles.productTitle} !text-lg leading-4 !font-medium !text-black/60`}
                  >
                    All Products
                  </h5>
                </div>
                <h5 className="pt-2 text-2xl font-semibold pl-8">
                  {products && products.length}
                </h5>
                <Link to={"/dashboard-products"}>
                  <h5 className="pt-4 pl-2 text-semibold text-emerald-500">
                    View Products
                  </h5>
                </Link>
              </div>
            </div>
            <br />
            <h5 className="text-2xl font-semibold font-Poppins">
              Latest Orders
            </h5>

            <div className="w-full min-h-[43vh] shadow-sm shadow-yellow-500 bg-white/90">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default DashboardHero;
