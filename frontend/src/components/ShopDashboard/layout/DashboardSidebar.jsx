import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { VscNewFile } from "react-icons/vsc";

import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
const DashboardSidebar = ({ active }) => {
  return (
    <>
      <div className="w-full h-[86vh] shadow-rose-500 mt-14 bg-white shadow-md scroll-smooth overflow-y-auto  sticky top-0 left-0 z-10">
        {/* single item  */}
        <div className="flex items-center w-full">
          <Link
            to="/dashboard"
            className="flex items-center w-full pt-4 pb-4 pl-4"
          >
            <RxDashboard
              size={30}
              className={`${active === 1 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 1 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              DASHBOARD
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-orders"
            className="flex items-center w-full pb-4 pl-4"
          >
            <FiShoppingBag
              size={30}
              className={`${active === 2 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 2 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Orders
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-products"
            className="flex items-center w-full pb-4 pl-4"
          >
            <FiPackage
              size={30}
              className={`${active === 3 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 3 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Products
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-create-product"
            className="flex items-center w-full pb-4 pl-4"
          >
            <AiOutlineFolderAdd
              size={30}
              className={`${active === 4 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 4 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              Create Products
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-events"
            className="flex items-center w-full pb-4 pl-4"
          >
            <MdOutlineLocalOffer
              size={30}
              className={`${active === 5 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 5 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              All Events
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-create-event"
            className="flex items-center w-full pb-4 pl-4"
          >
            <VscNewFile
              size={30}
              className={`${active === 6 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 6 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              Create Event
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-withdraw-money"
            className="flex items-center w-full pb-4 pl-4"
          >
            <CiMoneyBill
              size={30}
              className={`${active === 7 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 7 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              WithDraw Money
            </h5>
          </Link>
        </div>
        <div className="flex items-center w-full">
          <Link
            to="/dashboard-inbox"
            className="flex items-center w-full pb-4 pl-4"
          >
            <BiMessageSquareDetail
              size={30}
              className={`${active === 8 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 8 ? "text-[crimson]" : "text-[#555]"
              } pl-4 text-base font-normal hidden 800px:block`}
            >
              Shop Inbox
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/dashboard-coupons"
            className="flex items-center w-full pb-4 pl-4"
          >
            <AiOutlineGift
              size={30}
              className={`${active === 9 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 9 ? "text-[crimson]" : "text-[#555]"
              } pl-2 text-lg font-normal hidden 800px:block`}
            >
              Discount Codes
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link
            to="/dashboard-refunds"
            className="flex items-center w-full pb-4 pl-4"
          >
            <HiOutlineReceiptRefund
              size={30}
              className={`${active === 10 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 10 ? "text-[crimson]" : "text-[#555]"
              } pl-2 text-lg font-normal hidden 800px:block`}
            >
              Refunds
            </h5>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link to="/settings" className="flex items-center w-full pb-4 pl-4">
            <CiSettings
              size={30}
              className={`${active === 11 ? "text-[crimson]" : "text-[#555]"}`}
            />{" "}
            <h5
              className={`${
                active === 11 ? "text-[crimson]" : "text-[#555]"
              } pl-2 text-lg font-normal hidden 800px:block`}
            >
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
