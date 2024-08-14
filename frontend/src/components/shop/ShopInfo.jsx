import axios from "axios";
import { backend_url, server } from "../../server";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductOfAll,
  getAllProductsShop,
} from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // console.log(data);

  // const totalReviewsLength = data && data?.reviews.length;
  const totalReviews =
    products && products.reduce((acc, item) => acc + item.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, item) =>
        acc + item.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  // toast.success(totalRatings);

  const averageRatings = totalRatings / totalReviews || 0;
  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      <div className="">
        <div className="w-full py-5">
          <div className="flex items-center justify-center w-full">
            <img
              src={`${backend_url}/${data?.avatar}`}
              alt=""
              className="object-cover rounded-full w-36 h-36"
            />
          </div>

          <h3 className="py-2 text-lg text-center">{data?.name}</h3>

          <p className="flex items-center p-2 text-sm opacity-85 ">
            {data?.description}
          </p>
        </div>

        <div className="p-2">
          <h5 className="font-medium">Address</h5>
          <h5 className="font-normal opacity-90">{data?.address}</h5>
        </div>

        <div className="p-2">
          <h5 className="font-medium">Total Products</h5>
          <h5 className="font-normal opacity-90">
            {products && products?.length}
          </h5>
        </div>

        <div className="p-2">
          <h5 className="font-medium">Shop Ratings</h5>
          <h5 className="font-normal opacity-90">{averageRatings}/5</h5>
        </div>

        <div className="p-2">
          <h5 className="font-medium">Joined On</h5>
          <h5 className="font-normal opacity-90">
            {data?.createdAt?.slice(0, 10)}
          </h5>
        </div>

        {isOwner && (
          <>
            <Link to={"/settings"}>
              <div className="px-5 py-2">
                <button
                  className={`${styles.button} !w-full !h-10 !rounded-md`}
                >
                  <span className="text-white ">Edit Shop</span>
                </button>
              </div>
            </Link>
            <div className="px-5 py-2" onClick={logoutHandler}>
              <button className={`${styles.button} !w-full !h-10 !rounded-md`}>
                <span className="text-white ">LogOut</span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
