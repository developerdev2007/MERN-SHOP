import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          size={20}
          key={i}
          color="yellow"
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <>
          <BsStarHalf
            size={20}
            key={i}
            className="mr-2 cursor-pointer"
            color="yellow"
          />
        </>
      );
    } else {
      stars.push(
        <>
          <AiOutlineStar
            size={20}
            className="mr-2 text-gray-800 cursor-pointer"
            key={i}
          />
        </>
      );
    }
  }
  return (
    <>
      <div className="flex ml-2 ">{stars}</div>
    </>
  );
};

export default Ratings;
