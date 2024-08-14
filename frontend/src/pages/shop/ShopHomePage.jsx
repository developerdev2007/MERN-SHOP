import styles from "../../styles/style";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <>
      <div className="bg-slate-50">
        <div className={`${styles.section}`}>
          <div className="flex justify-between w-full py-10 ">
            <div className="w-[25%] bg-[#fff] h-[90vh] shadow-teal-400 rounded-sm  shadow-lg overflow-y-auto sticky top-2 left-0  z-10  ">
              <ShopInfo isOwner={true} />
            </div>
            <div className="w-[72%] rounded-md">
              <ShopProfileData isOwner={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHomePage;
