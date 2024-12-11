import { server } from "../../server";
import { TbPasswordUser } from "react-icons/tb";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
        // console.log("logout");
      })
      .catch((err) => {
        // console.log("");
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full p-4 pt-8 bg-white rounded-lg shadow-sm">
        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(1)}
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`${
              active === 1 ? "text-red-500" : ""
            } pl-3 800px:block hidden `}
          >
            Profile
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`${
              active === 2 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Orders
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(3)}
        >
          <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`${
              active === 3 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Refunds
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(4) || navigate("/inbox")}
        >
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`${
              active === 4 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(5)}
        >
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`${
              active === 5 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(6)}
        >
          <TbPasswordUser size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`${
              active === 6 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(7)}
        >
          <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`${
              active === 7 ? "text-red-500" : ""
            } pl-3 800px:block hidden `}
          >
            Address
          </span>
        </div>
        {user && user?.role === "Admin" && (
          <>
            <Link to="/admin/dashboard">
              <div
                className="flex items-center w-full mb-8 cursor-pointer"
                onClick={() => setActive(8)}
              >
                <MdOutlineAdminPanelSettings
                  size={20}
                  color={active === 7 ? "red" : ""}
                />
                <span
                  className={`${
                    active === 8 ? "text-red-500" : ""
                  } pl-3 800px:block hidden `}
                >
                  Admin DashBoard
                </span>
              </div>
            </Link>
          </>
        )}
        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(8) || logoutHandler()}
        >
          <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`${
              active === 8 ? "text-red-500" : ""
            } pl-3 800px:block hidden`}
          >
            Log Out
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
