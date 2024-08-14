import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style.js";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import WishList from "../wishlist/WishList";
import { categoriesData } from "../../static/data.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { backend_url } from "../../server.js";
import { RxCross2 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);

  useEffect(() => {
    if (dropDown) {
      setTimeout(() => {
        setDropDown(false);
      }, 10000);
    }
  }, [dropDown]);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    const filteredProducts =
      allProducts &&
      allProducts?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    setSearchData(filteredProducts);
    // console.log(searchData);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section} bg-white`}>
        <div className="hidden 800px:h-12 bg-white 800px:my-[20px] 800px:flex items-center justify-between">
          <div className="">
            <Link to="/" className="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkUwimZ2dcmd7cY3qq_DLg9HiyckRgm6GWA&s"
                alt=""
                className="w-[140px] h-[70px] object-cover"
              />
            </Link>
          </div>
          {/*** Search Bar */}
          <div className="relative bg-white w-[50%]">
            <input
              type="search"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-3 pl-12 border-[2px] rounded-lg border-[#1a49d6]  focus:outline-[#1a49d6]"
              // autoFocus="true"
            />
            <AiOutlineSearch
              size={30}
              className="absolute z-0 ml-2  pr-1  left-0 top-1.5 cursor-pointer text-[#1a49d6]"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-md-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${i?._id}`}>
                        <div className="flex items-start w-full py-3">
                          <img
                            src={`${backend_url}/${i.images && i?.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1 className="">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* Seller  */}
          <Link to="/dashboard">
            <div className={`${styles.button}`}>
              <h1 className="flex items-center  text-white">
                {isSeller ? <>Go To Dashboard</> : <>Become Seller</>}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </div>
          </Link>
        </div>
      </div>

      {/*  ? all categories && Navbar  */}
      <div
        className={`${
          active === true ? "shadow-md fixed top-0 left-0 z-10" : null
        } transition hidden  800px:flex items-center justify-between w-full bg-[#00489b] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div
            className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
            onClick={() => setDropDown(!dropDown)}
          >
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-full w-full flex items-center justify-between pl-10 bg-white font-sans  text-lg font-[400] select-none rounded-t-md`}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute cursor-pointer right-2 top-5"
            />{" "}
            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>
          {/* NavItems  */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/* ////////// !!card Icons/////////////////  */}
          <div className={`${styles.normalFlex}`}>
            <div
              className="relative cursor-pointer mr-3.5"
              onClick={() => setOpenWishList(true)}
            >
              <AiOutlineHeart size={30} color="rgb(255 255 255/83%)" />
              <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {wishList && wishList?.length}
              </span>
            </div>

            <div
              className="relative cursor-pointer mr-3.5"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255/83%)" />
              <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart?.length}
              </span>
            </div>

            <div className="relative cursor-pointer mr-3.5">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      alt=""
                      className="object-cover rounded-full w-9 h-9"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <AiOutlineUser size={30} color="rgb(255 255 255/83%)" />
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* cart POpup  */}

          {openCart ? (
            <>
              <Cart setOpenCart={setOpenCart} />
            </>
          ) : null}

          {openWishList ? (
            <>
              <WishList setOpenWishList={setOpenWishList} />
            </>
          ) : null}
        </div>
      </div>

      {/*! Mobile Header  */}
      <div
        className={` ${
          active === true ? "shadow-md fixed top-0 left-0 z-10" : null
        }top-0 left-0 z-50 w-full h-16 overflow-hidden bg-white shadow-lg 800px:hidden shadow-gray-700`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="">
            <BiMenuAltLeft
              size={40}
              className="ml-4 "
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="">
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkUwimZ2dcmd7cY3qq_DLg9HiyckRgm6GWA&s"
                alt="logo"
                className="object-cover w-20 h-16 mt-2 cursor-pointer"
              />
            </Link>
          </div>
          <div className="">
            <div
              className="relative mr-5 p-1 bg-slate-500/10 rounded-full"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white bg-orange-500 rounded-full ">
                {cart && cart?.length}
              </span>
            </div>
            {openCart ? (
              <>
                <Cart setOpenCart={setOpenCart} />
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/*! Mobile Header  Sidebar*/}

      {open && (
        <>
          <div className="fixed left-0 top-0 w-full h-full bg-[#0000005]  z-50">
            <div className="fixed left-0 right-0 z-10 w-9/12 h-screen overflow-y-scroll bg-gray-100 ">
              <div className="flex items-center justify-between w-full pr-3">
                <div>
                  <div
                    className="relative mr-4"
                    onClick={() => setOpenWishList(true)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white bg-orange-500 rounded-full ">
                      {wishList && wishList?.length}
                    </span>
                  </div>
                  {openWishList ? (
                    <>
                      <WishList setOpenWishList={setOpenWishList} />
                    </>
                  ) : null}
                </div>
                <div className="">
                  <RxCross2
                    size={30}
                    className="mt-5 ml-4 "
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              <div className="relative w-11/12 h-10 m-auto my-8 ">
                <input
                  type="search"
                  placeholder="Search Products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-3 border-[2px] rounded-lg border-[#1a49d6]  focus:outline-[#1a49d6]"
                  // autoFocus="true"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-md-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        // const d = i.name;
                        // const product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${i?._id}`}>
                            <div className="flex items-start w-full py-3">
                              <img
                                src={`${backend_url}/${
                                  i.images && i?.images[0]
                                }`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1 className="">{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <Navbar activeHeading={1} />
              <div
                className={`${styles.button} mx-auto max-w-56 rounded-md w-full`}
              >
                <Link to="/dashboard">
                  <h1 className="flex items-center text-white">
                    {isSeller ? <>Go To Dashboard</> : <>Become Seller</>}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              {!isAuthenticated ? (
                <>
                  <div className="flex items-center justify-center w-full mb-10">
                    <Link
                      to="/login"
                      className="pl-1 text-lg font-medium text-gray-800"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="pl-1 text-lg font-medium text-gray-800"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <div className="relative w-full mx-auto">
                      <img
                        src={`${backend_url}/${user?.avatar}`}
                        alt=""
                        className="object-cover w-40 h-40 mx-auto mt-5 mb-10 border-4 border-teal-500 rounded-full"
                      />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
