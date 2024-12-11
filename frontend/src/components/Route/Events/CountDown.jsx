import { useEffect, useState } from "react";
import { server } from "../../../server";
import axios from "axios";

const CountDown = ({ data }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(data?.finish_date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    console.log({ timer });
    console.log(timeLeft.days);

    if (
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined"
    ) {
      axios.delete(
        `${process.env.REACT_APP_API_URL}/event/delete-shop-event/${data._id}`
      );
    }
    return () => clearTimeout(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;
    return (
      <span className="text-2xl text-[#475ad2]">
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  return (
    <>
      <div className="">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <>
            <span className="text-2xl text-red-500 ">Time's Up</span>
          </>
        )}
      </div>
    </>
  );
};

export default CountDown;
