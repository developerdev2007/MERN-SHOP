import styles from "../../styles/style";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";
import Header from "../../components/Layout/Header";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <Header />
      <div className="800px:flex block justify-between w-full py-10">
        <div className="800px:w-[25%] w-full bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-auto h-[90vh] 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="800px:w-[72%] mt-10 800px:mt-['unset] rounded-[4px]">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
