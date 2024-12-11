import { useState } from "react";
import styles from "../../styles/style";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full px-4">
        <h1 className="pt-5 pb-2 text-3xl font-semibold text-center from-inherit to-orange-600 ">
          Change Password
        </h1>
        <br />
        <div className="w-full">
          <form
            action=""
            className="w-full"
            aria-required
            onSubmit={passwordChangeHandler}
          >
            <div className="w-9/12 mx-auto mb-10">
              <label htmlFor="old-password" className="block pb-2 ">
                Old Password
              </label>
              <input
                type="password"
                name="old-password"
                id="old-password"
                className={`${styles.input} h-10 !w-[90%] mb-6 800px:mb-0 shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="w-9/12 mx-auto mb-10">
              <label htmlFor="new-password" className="block pb-2 ">
                New Password
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                className={`${styles.input} h-10  mb-6 800px:mb-0  !w-[90%] shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="w-9/12 mx-auto mb-10">
              <label htmlFor="confirm-password" className="block pb-2 ">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className={`${styles.input} h-10  mb-6 800px:mb-0  !w-[90%] shadow-md border-t-2 border-teal-500 shadow-teal-600`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* /////// !!! */}
            <div className="w-9/12 mx-auto mb-10">
              <input
                type="submit"
                value="Update Password"
                required
                className="h-16 w-[90%] mt-8 mb-6 bg-transparent transition-all duration-500 hover:bg-teal-200 border-2 border-blue-700 rounded-lg cursor-pointer 800px:mb-0"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
