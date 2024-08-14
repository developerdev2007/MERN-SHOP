import { useNavigate } from "react-router-dom";
import SignUp from "../components/signUp/SignUp";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SignUpPage = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate(`/`);
      } else {
        navigate("/sign-up");
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="">
        <SignUp />
      </div>
    </>
  );
};

export default SignUpPage;
