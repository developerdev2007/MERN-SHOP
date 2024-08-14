import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <>
      <div className="text-white bg-black ">
        <div className="px-4 md:flex md:justify-between md:items-center sm:py-12  bg-[#342ac8] py-7">
          <h1 className="mb-6 text-3xl font-semibold lg:text-4xl md:mb-0 lg:leading-normal md:w-2/5">
            <span className="text-[#56d879]">Subscribe</span> Us for news <br />
            events and offers
          </h1>
          <div className="">
            <input
              type="text"
              required
              placeholder="Enter your Email..."
              className="sm:w-72 w-full mr-1 lg:mb-0 mb-4 py-2.5 rounded-md px-2 focus:outline-none"
            />
            <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full ">
              Submit
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-3 lg:grid-cols-4 sm:px-8 sm:text-center ">
          <ul className="flex flex-col items-center px-5 text-center sm:text-start sm:block ">
            <img
              src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo.jpg"
              alt=""
              className="object-cover w-24 h-16 rounded-full "
            />
            <br />
            <p className="">
              The Home and elements to create beautifull products{" "}
            </p>
            <div className="flex items-center mt-4">
              <AiFillFacebook size={25} className="cursor-pointer" />
              <AiFillInstagram
                size={25}
                style={{ marginLeft: "15px" }}
                className="cursor-pointer"
              />
              <AiFillTwitterCircle
                size={25}
                style={{ marginLeft: "15px" }}
                className="cursor-pointer"
              />
              <AiFillYoutube
                size={25}
                style={{ marginLeft: "15px" }}
                className="cursor-pointer"
              />
            </div>
          </ul>

          <ul className="text-center sm:text-start ">
            <h1 className="mb-1 font-semibold ">Company</h1>

            {footerProductLinks?.map((link, index) => (
              <>
                <li
                  className="text-gray-400 duration-300 hover:text-teal-400"
                  key={index}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              </>
            ))}
          </ul>
          <ul className="text-center sm:text-start ">
            <h1 className="mb-1 font-semibold ">Shop</h1>

            {footercompanyLinks?.map((link, index) => (
              <>
                <li
                  className="text-gray-400 duration-300 hover:text-teal-400"
                  key={index}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              </>
            ))}
          </ul>
          <ul className="text-center sm:text-start ">
            <h1 className="mb-1 font-semibold ">Support Links</h1>

            {footerSupportLinks?.map((link, index) => (
              <>
                <li
                  className="text-gray-400 duration-300 hover:text-teal-400"
                  key={index}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-2 pb-8 text-base text-center text-gray-400 sm:grid-cols-2 lg:grid-cols-2 ">
          <span>&copy; developerDev2007 , All Rights Reserved .</span>
          <span>Terms . privacy Policy .</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
