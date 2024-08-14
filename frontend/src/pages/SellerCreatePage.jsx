import { useSelector } from "react-redux";
import SellerCreate from "../components/shop/SellerCreate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SellerCreatePage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, []);
  return (
    <>
      <div className="">
        <SellerCreate />
      </div>
    </>
  );
};

export default SellerCreatePage;
