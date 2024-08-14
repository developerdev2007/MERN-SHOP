import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/shop/ShopLogin";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopLoginPage = () => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isSeller, isLoading]);

  return (
    <>
      <ShopLogin />
    </>
  );
};

export default ShopLoginPage;
