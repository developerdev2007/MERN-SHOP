import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../styles/style";
import { toast } from "react-toastify";
import { loadSeller, loadUser } from "../redux/actions/user";
import axios from "axios";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [zipCode, setZipCode] = useState(seller?.zipCode);
  const [address, setAddress] = useState(seller?.address);
  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(
    seller?.description ? seller?.description : null
  );
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/shop/update-shop-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const updateShopInfo = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/shop/update-shop-info`,
        {
          address,
          name,
          phoneNumber,
          zipCode,
          description,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="w-full my-6 min-h-screen">
        <div className="flex w-full mx-auto 800px:w-9/12 bg-white shadow-lg shadow-gray-600 flex-col  justify-center">
          {/* ************************************************************************  */}
          <div className="w-full flex items-center justify-center my-4">
            <div className="relative">
              {" "}
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : `${backend_url}/${seller?.avatar}`
                }
                alt=""
                className="w-40 h-40 border-4 border-yellow-500/80   rounded-full object-cover"
              />
              <div className="absolute flex items-center justify-center p-1 bg-gray-900 cursor-pointer rounded-full w-8 h-8  bottom-2.5 right-2.5 ">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden "
                  onChange={handleImageChange}
                />
                <label htmlFor="avatar" className="">
                  <AiOutlineCamera size={40} className="text-white" />
                </label>
              </div>
            </div>
          </div>
          {/* //!! ShopInfo */}

          <div className="w-full flex items-center justify-center my-4">
            <form
              action=""
              className="w-full"
              aria-required
              onSubmit={updateShopInfo}
            >
              <div className="w-9/12 mx-auto mb-10">
                <label htmlFor="Name" className="block pb-2 ">
                  Shop Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder={`${seller?.name}`}
                  className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-9/12 mx-auto mb-10">
                <label htmlFor="Name" className="block pb-2 ">
                  Shop Description
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder={`${
                    seller?.description
                      ? seller?.description
                      : "Enter your shop description"
                  }`}
                  className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="w-9/12 mx-auto mb-10">
                <label htmlFor="Name" className="block pb-2 ">
                  Shop Address
                </label>
                <input
                  type="address"
                  name="address"
                  id="address"
                  placeholder={`${seller?.address}`}
                  className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* //////////////  */}
              <div className="w-9/12 mx-auto mb-10">
                <label htmlFor="Name" className="block pb-2 ">
                  Shop Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={`${seller?.phoneNumber}`}
                  className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {/* //////////////  */}
              <div className="w-9/12 mx-auto mb-10">
                <label htmlFor="Name" className="block pb-2 ">
                  Shop ZipCode
                </label>
                <input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  placeholder={`${seller?.zipCode}`}
                  className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              {/* /////// !!! */}
              <div className="w-9/12 mx-auto mb-10">
                <input
                  type="submit"
                  value="Update Shop"
                  required
                  readOnly
                  className="h-16 w-[90%] mt-8 mb-6 bg-transparent transition-all duration-500 hover:bg-teal-200 border-2 border-blue-700 rounded-lg cursor-pointer 800px:mb-0"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSettings;
