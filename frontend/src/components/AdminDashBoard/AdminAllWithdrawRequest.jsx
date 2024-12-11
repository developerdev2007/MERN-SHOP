import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { BsPencil } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const AdminAllWithdrawRequest = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState(null);
  const [withdrawStatus, setWithdrawStatus] = useState(withdrawData?.status);

  const dispatch = useDispatch();

  const getAllWithdraw = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/withdraw/get-all-withdrawRequest`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.withdraws);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllWithdraw();
  }, [dispatch]);

  const handleSubmit = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/withdraw/update-withdraw-request/${withdrawData.id}`,
        { sellerId: withdrawData?.shopId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("SuccessFull");
        getAllWithdraw();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };
  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 100,
      flex: 1,
    },
    { field: "shopId", headerName: "Shop Id", minWidth: 100, flex: 0.7 },
    {
      field: "price",
      headerName: "price",
      minWidth: 100,
      type: "number",
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "status",
      minWidth: 100,
      type: "text",
      flex: 0.6,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      minWidth: 100,
      type: "number",
      flex: 0.6,
    },
    {
      field: "",
      headerName: "Update Status",
      minWidth: 100,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <>
            <BsPencil
              size={25}
              className={`w-full flex item-center justify-center mt-3 cursor-pointer ${
                params.row.status === "Succeed" ? "hidden" : "block"
              }`}
              onClick={() => setOpen(true) || setWithdrawData(params.row)}
            />
          </>
        );
      },
    },
  ];

  console.log(withdrawData);
  const rows = [];
  data &&
    data.forEach((withdraw) =>
      rows.push({
        id: withdraw?._id,
        shopId: withdraw?.seller?._id,
        name: withdraw?.seller?.name,
        price: "US$ " + withdraw?.amount,
        status: withdraw?.status,
        createdAt: withdraw?.createdAt.slice(0, 10),
      })
    );
  return (
    <>
      <div className="w-full">
        <div className="w-11/12 pt-1 mx-auto mt-14 bg-white ">
          <DataGrid
            rows={rows}
            pagesize={10}
            disableSelectionOnCLick
            autoHeight
            columns={columns}
          />
        </div>
        {open && (
          <>
            {" "}
            <div className="w-full fixed top-0 left-0 right-0  flex items-center justify-center  h-screen z-50 bg-black/50 ">
              <div className="800px:w-[50%] w-11/12 min-h-[40vh] bg-white mx-auto  rounded-lg shadow-xl ">
                <div className="w-11/12 my-2 mx-auto flex items-center justify-around bg-slate-200 rounded-full h-14">
                  <h3 className="text-2xl text-center">
                    Update WithDraw Status
                  </h3>

                  <RxCross2
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <br />
                <div className="w-52 h-10 p-0 m-0  mx-5 rounded border items-center flex justify-center">
                  <select
                    name=""
                    className="w-full h-full "
                    id=""
                    onChange={(e) => setWithdrawStatus(e.target.value)}
                  >
                    <option value={withdrawStatus} className="">
                      {withdrawData?.status}
                    </option>
                    <option value="Succeed" className="">
                      Succeed
                    </option>
                  </select>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="w-52 mt-5 mx-5 h-10 rounded-lg text-white px-5 py-1 bg-teal-500/80 "
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AdminAllWithdrawRequest;
