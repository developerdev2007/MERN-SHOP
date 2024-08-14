import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../server";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-30 flex items-center justify-between w-full h-16 px-4 overflow-hidden bg-white shadow-md ">
        {/* ! logo  */}
        <div className="">
          <Link to="/">
            <img
              src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo.jpg"
              alt=""
              className="object-cover h-24 shadow-inner bg w-28"
            />
          </Link>
        </div>

        <div className="flex items-center ">
          <div className="flex items-center mr-4">
            <Link to="/dashboard-coupons" className="hidden 800px:block">
              <AiOutlineGift
                color="#555"
                className="mx-5 cursor-pointer"
                size={30}
              />
            </Link>

            <Link to="/dashboard-events" className="hidden 800px:block">
              <MdOutlineLocalOffer
                color="#555"
                className="mx-5 cursor-pointer"
                size={30}
              />
            </Link>

            <Link to="/dashboard-products" className="hidden 800px:block">
              <FiShoppingBag
                color="#555"
                className="mx-5 cursor-pointer"
                size={30}
              />
            </Link>

            <Link to="/dashboard-orders" className="hidden 800px:block">
              <FiPackage
                color="#555"
                className="mx-5 cursor-pointer"
                size={30}
              />
            </Link>

            <Link to="/dashboard-messages" className="hidden 800px:block">
              <BiMessageSquareDetail
                color="#555"
                className="mx-5 cursor-pointer"
                size={30}
              />
            </Link>
            <Link to={`/shop/${user?._id}`}>
              <img
                src={`${backend_url}/${user?.avatar}`}
                alt=""
                className="object-cover w-12 h-12 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
