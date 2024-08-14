import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import { loadUser, updateUserInfo } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { user, error } = useSelector((state) => state.user);

  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(loadUser());
  }, [error, dispatch, setAvatar]);

  ///////////---------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(email, password, phoneNumber, name));
    setPassword("");
  };

  //////--------------------

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    const ans = await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multiple/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        dispatch(loadUser());
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    toast.success(ans?.data?.message);
  };

  return (
    <>
      <div className="w-full h-[90vh] ">
        <div className="flex items-center  justify-center w-full">
          <div className="relative">
            <img
              src={`${backend_url}/${user?.avatar}`}
              alt=""
              className="object-cover w-40 h-40 border-2 border-green-500 rounded-full"
            />
            <div className="absolute flex items-center justify-center p-0.5 bg-gray-900 cursor-pointer rounded-full w-8 h-8  bottom-2.5 right-2.5 ">
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
        <br />
        <br />
        <div className="w-full px-5 ">
          <form onSubmit={handleSubmit} aria-required="true">
            <div className="block w-full pb-3 800px:flex">
              <div className="w-full 800px:w-1/2 ">
                <label htmlFor="name" className="block pb-2 ">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`${styles.input} !w-[95%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="w-full 800px:w-1/2 ">
                <label htmlFor="email" className="block pb-2 ">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`${styles.input}  mb-6 800px:mb-0  !w-[95%] shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="block w-full pb-3 800px:flex">
              <div className="w-full 800px:w-1/2 ">
                <label htmlFor="phone" className="block pb-2 ">
                  Phone no.
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className={`${styles.input} mb-6 800px:mb-0 !w-[95%] shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="w-full 800px:w-1/2 ">
                <label htmlFor="phone" className="block pb-2 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`${styles.input} mb-6 800px:mb-0 !w-[95%] shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Upload"
              required
              className="h-10 mt-8 mb-6 bg-teal-200 border-2 border-blue-700 rounded-lg cursor-pointer 800px:mb-0 w-60"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
