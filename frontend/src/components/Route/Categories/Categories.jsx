import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/style";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block `}>
        <div
          className={`branding my-12 flex  justify-between w-full shadow-md bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((data, index) => (
              <>
                <div key={index} className={`${styles.normalFlex} items-start`}>
                  {data?.icon}
                  <div className="p-3 ">
                    <h3 className="text-sm font-bold md:text-base">
                      {data?.title}
                    </h3>
                    <p className="text-xs md:text-sm">{data?.Description}</p>
                  </div>{" "}
                </div>
              </>
            ))}
        </div>
      </div>

      {/* Categories  */}
      <div
        className={`${styles.section} bg-[#fee]  p-6  rounded-lg  mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-7">
          {categoriesData &&
            categoriesData.map((data, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
                // window.location.reload();
              };
              return (
                <>
                  <div
                    className="flex items-center justify-between w-full h-24 cursor-pointer"
                    key={index}
                    onClick={() => handleSubmit(data)}
                  >
                    <h3 className="text-lg leading-5">{data?.title}</h3>
                    <img
                      src={data?.image_Url}
                      alt=""
                      className="object-cover w-28"
                    />
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
