import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/style.js";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import axios from "axios";
const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  ///********------Handle Shop Login------- */

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login to Shop Success !!!");
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        // console.log(error);
      });
  };
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen py-12 mx-auto rounded-lg bg-gray-50 sm:w-full sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900 ">
            Login to Your Shop
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-6 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form action="" className="space-y-6" onSubmit={handleLogin}>
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Address
                </label>
                <div className="relative mt-1">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute cursor-pointer right-2 top-2"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute cursor-pointer right-2 top-2"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              {/* Forgot & remember  */}
              <div className={`${styles.normalFlex} justify-between`}>
                {" "}
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 borer-gray-300"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-gray-800"
                  >
                    Remember me{" "}
                  </label>{" "}
                </div>
                <div className="text-sm">
                  <a
                    href="#forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              {/* Button  */}
              <div className="">
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-blue-600 hover:bg-blue-500 "
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.normalFlex} w-full`}>
                <h4 className="">Not Have any Account?</h4>
                <Link to="/seller-create" className="pl-2 text-blue-600">
                  {" "}
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopLogin;
