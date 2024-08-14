import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <>
      <div className="pb-4 w-[270px] bg-white  absolute z-30 rounded-b-md shadow-xl shadow-blue-600 ">
        {categoriesData &&
          categoriesData.map((category, index) => (
            <>
              <div
                key={index}
                className={`${styles.normalFlex} cursor-auto`}
                onClick={() => handleSubmit(category)}
              >
                <img
                  src={category.image_Url}
                  alt=""
                  className={`w-[25px]  h-[25px] object-contain ml-3 select-none`}
                />
                <h3 className="m-3  cursor-pointer select-none">
                  {category.title}
                </h3>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default DropDown;
