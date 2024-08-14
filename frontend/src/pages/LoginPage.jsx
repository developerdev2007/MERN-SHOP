import { useEffect, useState } from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate(`/`);
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full mx-auto ">
      <Login />
    </div>
  );
};

export default LoginPage;
