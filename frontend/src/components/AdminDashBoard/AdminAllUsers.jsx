import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAllUsers = () => {
  const { adminUsers, isLoading } = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${server}/user/admin-all-users`, {
          withCredentials: true,
        });
        setAllUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    fetchUsers();
  }, [userId, open]);

  const handleDelete = async (id) => {
    // Delete user
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "email",
      headerName: "Email",
      type: "String",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "string",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true) || setUserId(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  allUsers &&
    allUsers?.forEach((user) => {
      row.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        joinedAt: user?.createdAt.slice(0, 10),
        total: allUsers?.length,
        status: user?.status,
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
          {open && (
            <>
              <div className="w-full right-0 left-0 top-0 flex z-50  items-center justify-center h-screen fixed bg-black/50 ">
                <div className="md:w-[40%] w-10/12 mx-auto md:h-1/3 h-1/3 bg-white/95 rounded-lg shadow-inner  shadow-teal-500">
                  <h3 className="text-2xl font-medium p-5 md:p-8  text-center text-red-600">
                    Are you Sure to delete User ?
                  </h3>
                  <div className="flex flex-wrap space-y-2 items-center justify-around m-4 ">
                    <button
                      className="md:w-40 w-full  h-12 rounded-xl  text-center px-5 py-2 bg-red-500 hover:bg-red-600 duration-300"
                      onClick={() => setOpen(!open) || handleDelete(userId)}
                    >
                      delete User
                    </button>
                    <button
                      className="md:w-40 w-full  h-12 rounded-xl text-center px-5 py-2 bg-blue-500 hover:bg-blue-600 duration-300"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AdminAllUsers;
