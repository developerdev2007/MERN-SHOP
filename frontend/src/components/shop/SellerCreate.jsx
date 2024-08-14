import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/style.js";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";

const SellerCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  ///********------Handle SignUp------- */
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    ////*** making form of data */
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);

    ////*** sending data  */
    await axios
      .post(`${server}/shop/create-seller`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        // setName("");
        // setEmail("");
        // setPassword("");
        // setAvatar(null);
        // setAddress("");
        // setZipCode();
        // setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen py-12 mx-auto bg-gray-300 rounded-lg sm:w-full sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900 ">
            Register as a Seller
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="px-6 py-8 bg-gray-200 shadow-xl sm:rounded-lg sm:px-10">
            <form action="" className="space-y-6" onSubmit={handleSignUp}>
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

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
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Address
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    name="address"
                    id="address"
                    autoComplete="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="Zip code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zipCode"
                    id="zipCode"
                    autoComplete="zipCode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-md appearance-none bg-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

              <div className="">
                {" "}
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 "
                ></label>
                <div className="flex items-center mt-2">
                  <span className="inline-block w-8 h-8 overflow-hidden rounded-full">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="userImage"
                        className="object-cover w-full h-full rounded-full "
                      />
                    ) : (
                      <RxAvatar className="w-8 h-8 " />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="flex items-center justify-center px-4 py-2 ml-5 text-sm font-medium text-gray-700 bg-white border border-gray-500 rounded-lg shadow-md hover:bg-gray-100"
                  >
                    <span className="">Upload A file</span>
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onClick={handleFileInputChange}
                      //// ! very important (sr-only)
                      className="sr-only"
                    />
                  </label>
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
                <h4 className="">Already have an Account?</h4>
                <Link to="/seller-login" className="pl-2 text-blue-600">
                  {" "}
                  Sign IN
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerCreate;
