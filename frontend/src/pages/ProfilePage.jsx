import Header from "../components/Layout/Header";
import styles from "../styles/style";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProfilePage = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (!isLoading) {
    if (!isAuthenticated) {
      <Navigate to="/login" />;
    }
  }

  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <div
        className={`${styles.section} flex  bg-slate-100 rounded-full py-10`}
      >
        <div className="sticky w-12 mt-[18%] 800px:w-80 800px:mt-0">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ProfilePage;
