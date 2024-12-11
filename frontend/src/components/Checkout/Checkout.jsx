import { useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const navigate = useNavigate();

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      city === "" ||
      country === "" ||
      zipCode === ""
    ) {
      toast.error("FILL OUT ALL THE FIELDS TO ORDER(Address)");
    } else {
      const shippingAddress = {
        address1,
        address2,
        city,
        country,
        zipCode,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
      };

      //!!!++++++++++ Update local Storage with orders array
      localStorage.setItem("latestOrders", JSON.stringify(orderData));

      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  ///!!!------------this is shipping cost
  const shipping = subTotalPrice * 0.1;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = couponCode;

    await axios
      .get(`${process.env.REACT_APP_API_URL}/coupon/get-coupon-value/${name}`)
      .then((res) => {
        const shopId = res?.data?.couponCode?.shop?._id;
        const couponCodeValue = res?.data?.couponCode?.value;
        if (res.data.couponCode === null) {
          toast.error("coupon code doesn't exist");
          setCouponCode("");
        } else {
          const isCouponCodeValid =
            cart && cart?.filter((item) => item?.shopId === shopId);

          if (isCouponCodeValid.length === 0) {
            toast.error("this coupon code is not for this shop");

            setCouponCode("");
          } else {
            const validPrice = isCouponCodeValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );
            //   console.log(validPrice);

            const discountPrice = (validPrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }
        console.log(res.data);
      });
  };
  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            country={country}
            zipCode={zipCode}
            setCountry={setCountry}
            user={user}
            setZipCode={setZipCode}
            setAddress2={setAddress2}
            setAddress1={setAddress1}
            address1={address1}
            address2={address2}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  zipCode,
  setCountry,
  setZipCode,
  setAddress2,
  setAddress1,
  address1,
  address2,
  city,
  setCity,
  userInfo,
  setUserInfo,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              required
              value={user && user?.name}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user?.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user?.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="inline-block text-lg cursor-pointer"
        onClick={() => {
          setUserInfo(!userInfo);
        }}
      >
        Choose from Saved Address
      </h5>

      {userInfo && (
        <>
          {user &&
            user.addresses.map((i) => (
              <>
                <div
                  className="flex w-full mt-2"
                  onClick={() =>
                    setAddress1(i.address1) ||
                    setAddress2(i.address2) ||
                    setZipCode(i.zipCode) ||
                    setCity(i.city) ||
                    setCountry(i.country) ||
                    setCity(i.city)
                  }
                >
                  <input
                    type="checkbox"
                    name="address-type"
                    value={i.addressType}
                    className="mr-3"
                    id={`address-type-${i.addressType}`}
                    ref={(input) => {
                      if (input) {
                        input.checked = false; // initialize checkbox to unchecked
                      }
                    }}
                  />
                  <h5
                    className="text-lg"
                    id="address-type"
                    name="address-type"
                    onClick={(e) => {
                      const checkbox = e.target.previousSibling;
                      checkbox.checked = !checkbox.checked;
                    }}
                  >
                    {i.addressType}
                  </h5>
                </div>
              </>
            ))}
        </>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">$ {subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          {shipping.toString(10).slice(0, 5)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between pb-3 border-b">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          -{discountPercentage ? "$" + discountPercentage?.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">$ {totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
