import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { CiBag1, CiMoneyBill } from "react-icons/ci";
import { GrWorkshop } from "react-icons/gr";

import { BsBag, BsGear } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdLocalOffer } from "react-icons/md";

const AdminSideBar = ({ active }) => {
  return (
    <>
      <div className="w-full h-[86vh] shadow-rose-500 mt-14 bg-white shadow-md scroll-smooth overflow-y-auto  sticky top-0 left-0 z-10">
        {/* //* single item  */}
        <div className="flex items-center w-full">
          <Link
            to="/admin/dashboard"
            className="flex items-center w-full pt-4 pb-4 pl-4"
          >
            <RxDashboard
              size={30}
              className={`${active === 1 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 1 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              DASHBOARD
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin/orders"
            className="flex items-center w-full pb-4 pl-4"
          >
            <FiShoppingBag
              size={30}
              className={`${active === 2 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 2 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Orders
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin/sellers"
            className="flex items-center w-full pb-4 pl-4"
          >
            <GrWorkshop
              size={30}
              className={`${active === 3 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 3 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Sellers
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin/users"
            className="flex items-center w-full pb-4 pl-4"
          >
            <HiOutlineUserGroup
              size={30}
              className={`${active === 4 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 4 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Users
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin/products"
            className="flex items-center w-full pb-4 pl-4"
          >
            <BsBag
              size={30}
              className={`${active === 5 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 5 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Products
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin/events"
            className="flex items-center w-full pb-4 pl-4"
          >
            <MdLocalOffer
              size={30}
              className={`${active === 6 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 6 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Events
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/admin-withdraw-request"
            className="flex items-center w-full pb-4 pl-4"
          >
            <CiMoneyBill
              size={30}
              className={`${active === 7 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 7 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              WithDraw Money
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/dashboard/profile"
            className="flex items-center w-full pb-4 pl-4"
          >
            <BsGear
              size={30}
              className={`${active === 8 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 8 ? "text-[crimson] font-Roboto" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
