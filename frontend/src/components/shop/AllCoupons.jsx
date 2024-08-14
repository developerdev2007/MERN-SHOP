import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import axios from "axios";

const AllCoupons = () => {
  const { seller } = useSelector((state) => state.seller);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCodes, setCouponCodes] = useState([]);
  const { products } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        toast.success(res.data?.message);
        // window.location.reload();
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error?.response?.data?.message);
        toast.error(error?.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProducts,
          shop: seller,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("couponCode created  successfully");
        setOpen(false);
        // window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    // console.log("first", seller._id);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        setCouponCodes(res.data?.couponCodes);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });

    // dispatch(getAllProductsShop(seller._id));
  }, [seller._id, setOpen]);

  const columns = [
    { field: "id", headerName: "Product Id", maxWidth: 150, axex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "price",
      minWidth: 100,
      type: "number",
      flex: 0.6,
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  couponCodes &&
    couponCodes.forEach((data) =>
      rows.push({
        id: data?._id,
        name: data?.name,
        price: data?.value + "%",
        sold: 10,
      })
    );
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full h-full pt-1 mx-8 mt-14 bg-white ">
          <div className="flex justify-end w-full">
            <div
              className={`${styles.button} w-max h-10 p-1 mr-2`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white ">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={rows}
            pagesize={10}
            disableSelectionOnCLick
            autoHeight
            columns={columns}
          />

          {open && (
            <>
              <div className="fixed top-0 left-0 z-20 w-full h-screen bg-[#333333a4] opacity flex items-center justify-center ">
                <div className="800px:w-[50%] w-10/12 h-5/6  mt-8 relative overflow-y-auto mb-8  rounded-lg shadow-xl shadow-gray-800 bg-white ">
                  <div className="absolute flex justify-end w-full p-4">
                    <RxCross1
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>

                  <h5 className="mt-3 text-3xl font-normal text-center font-Poppins">
                    Create coupon code
                  </h5>

                  <form
                    onSubmit={handleSubmit}
                    className="-mt-3"
                    aria-required={true}
                  >
                    <br />
                    <div className="w-11/12 mx-auto">
                      <label htmlFor="" className="pb-2 ">
                        Name <span className="text-xl text-red-700">*</span>
                      </label>
                      <input
                        type="name"
                        className="block w-full mt-2 appearance-none mx-auto  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
                        value={name}
                        autoFocus
                        required
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        placeholder="Enter Coupon code  Name..."
                      />
                    </div>

                    <br />
                    <div className="w-11/12 mx-auto">
                      <label htmlFor="" className="pb-2 ">
                        Discount Percentage{" "}
                        <span className="text-xl text-red-700">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        className="block w-full mt-2 appearance-none mx-auto  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        name="value"
                        placeholder="Enter  Discount Percentage from coupon code..."
                      />
                    </div>

                    <br />
                    <div className="w-11/12 mx-auto">
                      <label htmlFor="" className="pb-2 ">
                        Min Amount{" "}
                      </label>
                      <input
                        type="number"
                        className="block w-full mt-2 appearance-none mx-auto  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        name="minAmount"
                        placeholder="Enter Coupon code Minimum amount..."
                      />
                    </div>
                    <br />
                    <div className="w-11/12 mx-auto">
                      <label htmlFor="" className="pb-2 ">
                        Max Amount{" "}
                      </label>
                      <input
                        type="number"
                        className="block w-full mt-2 appearance-none mx-auto  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        name="minAmount"
                        placeholder="Enter Coupon code Max amount..."
                      />
                    </div>
                    <br />
                    <div className="w-11/12 mx-auto">
                      <label htmlFor="" className="pb-2 ">
                        Selected Products
                      </label>
                      <select
                        name="category"
                        className="w-full h-8 mt-2 border border-blue-500 rounded-md focus:outline-none focus:ring-blue-600 "
                        id=""
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                      >
                        <option value="Choose a category" className="">
                          Choose a Your selected Products
                        </option>
                        {products &&
                          products.map((data) => (
                            <>
                              <option
                                value={data?.name}
                                key={data?.name}
                                className=""
                              >
                                {data?.title}
                              </option>
                            </>
                          ))}
                      </select>
                    </div>
                    <br />
                    <div className="w-11/12 mx-auto mb-10">
                      <input
                        type="submit"
                        className="block hover:bg-blue-300 cursor-pointer w-full text-center mt-2 appearance-none mx-auto  p-3 h-[35px] border border-gray-400 rounded-md placeholder-slate-600 focus:outline-none  focus:ring-blue-600 sm:text-sm"
                        value="Submit"
                        name="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
