import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server.js";
import axios from "axios";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {error ? (
        <p className=""> Your Token is Expired</p>
      ) : (
        <p className="">YOur account has been created successfully</p>
      )}
    </div>
  );
};

export default ActivationPage;
