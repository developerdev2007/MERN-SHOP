import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import axios from "axios";
///****+++++++++++++++++++ paypal part
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
///****+++++++++++++++++++ Stripe part
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
/////?-----------------------------
import { useSelector } from "react-redux";
import { server } from "../../server";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  ///****+++++++++++++++++++ Stripe part
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const orderDatalocal = JSON.parse(localStorage.getItem("latestOrders"));
    setOrdersData(orderDatalocal);
  }, []);

  ///****+++++++++++++++++++ paypal part

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "SunFlower",
            amount: {
              currency_code: "USD",
              value: ordersData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };
  ///****+++++++++++++++++++ paypal part
  const onApprove = async (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  ///****+++++++++++++++++++ paypal part
  const paypalPaymentHandler = async (paymentInfo) => {
    ////paypal handling`
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "PayPal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        toast.success("Order has been successfully done !");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrders", JSON.stringify([]));
        navigate("/order/success");
      });
  };

  const paymentData = {
    amount: Math.round(ordersData?.totalPrice * 100),
  };

  const order = {
    cart: ordersData?.cart,
    shippingAddress: ordersData?.shippingAddress,
    user: user && user,
    totalPrice: ordersData?.totalPrice,
  };
  ///****+++++++++++++++++++ Stripe part
  const paymentHandler = async (e) => {
    e.preventDefault();
    // console.log("paymentHandler");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      // console.log("client_secret: ", client_secret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: elements.getElement(CardNumberElement) },
      });

      // console.log("result: ", result);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log(
            "result.paymentIntent.status: ",
            result.paymentIntent.status
          );
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              toast.success("Order has been succesfully Created");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrders", JSON.stringify([]));
              navigate("/order/success");
            })
            .catch((error) => {
              toast.error(error);
              console.log("error in axios: ", error);
            });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  ///****+++++++++++++++++++ Cash on delivery part
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        toast.success("Order has been succesfully Created");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrders", JSON.stringify([]));
        navigate("/order/success");
      })
      .catch((error) => {
        toast.error(error);
        console.log("error in axios: ", error);
      });
  };
  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData ordersData={ordersData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(false);
  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with Stripe  */}
        {select === 1 ? (
          <div className="flex w-full border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name on Card Number</label>
                  <input
                    required
                    placeholder={user && user?.name}
                    className={`${styles.input} !w-[95%]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "18px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "20px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Cvv</label>
                  <CardCvcElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "20px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
      {/*////////** __________________________________________________________________________________________________________________________________________________________________________________ */}
      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with paypal */}
        {select === 2 ? (
          <div className="flex w-full border-b">
            <div
              className={`${styles.button} !bg-red-500/90 text-white h-14 rounded-sm cursor-pointer text-base font-600 `}
              onClick={() => setOpen(true)}
            >
              Pay Now{" "}
            </div>
            {open && (
              <>
                <div className="w-full fixed right-0 top-0 left-0 bg-black/80  h-screen flex items-center justify-center z-50">
                  <div className="w-full h-screen 800px:w-6/12 800px:h-5/6 bg-white/95 rounded-md shadow overflow-y-auto flex flex-col justify-center p-8 relative ">
                    <div className="w-full flex justify-end">
                      <RxCross1
                        size={30}
                        className="cursor-pointer absolute right-5 top-5 "
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AZ6auc-_-387x89wdLkxmyyHP3iXx_TNpTGaM8ELdTe9WapJLWH2zusXie40NenibWEvoYJg7QLjkSjM",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </>
            )}{" "}
          </div>
        ) : null}
      </div>
      {/*////////** __________________________________________________________________________________________________________________________________________________________________________________ */}
      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 mb-2 border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* Cash on delivery */}
        {select === 3 ? (
          <div className="flex w-full">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const CartData = ({ ordersData }) => {
  const shipping = ordersData?.shipping?.toFixed(2);
  const subTotalPrice = ordersData?.subTotalPrice?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between pb-3 border-b">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {ordersData?.discountPrice ? "$" + ordersData?.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        $ {ordersData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
