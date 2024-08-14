import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../redux/actions/order";
import styles from "../styles/style";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { loadSeller, loadUser } from "../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const ShopWithDrawMoney = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState(false);
  const { seller } = useSelector((state) => state.seller);
  const [withdrawAmount, setWithdrawAmount] = useState(20);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankHolderName: "",
    bankAccNumber: null,
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);
  const availableBalance = seller?.availBalance.toFixed(2);
  const handleAddWithdrawMethod = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccNumber,
      bankAddress: bankInfo.bankAddress,
      bankHolderName: bankInfo.bankHolderName,
    };
    await axios
      .put(
        `${server}/shop/update-withdraw-methods`,
        { withdrawMethod },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankHolderName: "",
          bankAccNumber: null,
          bankAddress: "",
        });
        setWithdrawMethod(false);
        dispatch(loadSeller());
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadSeller());
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const withdrawHandler = async (e) => {
    if (availableBalance && withdrawAmount) {
      if (withdrawAmount < 20 || withdrawAmount > availableBalance) {
        toast.error("You cant withdraw money ");
        return;
      }
    }

    await axios
      .post(
        `${server}/withdraw/create-withdraw-request`,
        { amount: withdrawAmount },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOpen(false);
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const error = () => {
    toast.error("You don't have enough balance to withdraw");
  };
  return (
    <>
      <div className="w-full h-[80vh] mt-10 p-5">
        <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col shadow-lg shadow-pink-500/80 ">
          <h5 className="text-xl font-semibold font-Poppins">
            Available Balance: ${availableBalance}
          </h5>

          <div
            className={`${styles.button} !text-white`}
            onClick={() => (availableBalance < 20 ? error() : setOpen(true))}
          >
            WithDraw
          </div>
        </div>

        {open && (
          <>
            <div className="w-full z-50 h-screen fixed top-0 right-0 left-0 flex items-center justify-center  bg-black/60  ">
              <div className="w-11/12 mt-4 800px:w-1/2 h-2/3 bg-white rounded-lg shadow-inner overflow-y-auto shadow-red-500">
                {withdrawMethod ? (
                  <>
                    <div className="">
                      <div className="bg-slate-100 rounded-full p-4 mt-5 w-11/12 mx-auto  flex justify-between items-start ">
                        <h5 className="text-2xl text-center mx-auto font-medium ">
                          Add new Withdraw Method{" "}
                        </h5>
                        <RxCross2
                          size={30}
                          onClick={() =>
                            setOpen(!open) || setWithdrawMethod(false)
                          }
                          className=" cursor-pointer"
                        />
                      </div>
                      <form
                        className="w-11/12 m-1 mx-auto p-4 space-y-4"
                        onSubmit={handleAddWithdrawMethod}
                      >
                        <div className="">
                          <label htmlFor="bank-holder-name" className="">
                            Bank-name
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankName}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankName: e.target.value,
                              })
                            }
                            required
                            type="name"
                            name="bank "
                            placeholder="Enter Your Bank Name"
                            className={`${styles.input}`}
                          />
                        </div>
                        <div className="">
                          <label htmlFor="bank-holder-name" className="">
                            Bank--Swift-Code
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankSwiftCode}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankSwiftCode: e.target.value,
                              })
                            }
                            required
                            type="Number"
                            name="bank "
                            placeholder="Enter Your Bank Swift code"
                            className={`${styles.input}`}
                          />
                        </div>
                        <div className="">
                          <label htmlFor="bank-holder-name" className="">
                            Bank Country
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankCountry}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankCountry: e.target.value,
                              })
                            }
                            required
                            type="country"
                            name="bank "
                            placeholder="Enter Your Bank Country"
                            className={`${styles.input}`}
                          />
                        </div>

                        <div className="">
                          <label htmlFor="bank-holder-name" className="">
                            Bank-Account Number
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankAccNumber}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankAccNumber: e.target.value,
                              })
                            }
                            required
                            type="number"
                            name="bank "
                            placeholder="Enter Your Bank Account-Name"
                            className={`${styles.input}`}
                          />
                        </div>

                        <div className="">
                          <label htmlFor="bank-holder-name" className="">
                            Bank-Holder-name
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankHolderName}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankHolderName: e.target.value,
                              })
                            }
                            required
                            type="name"
                            name="bank "
                            placeholder="Enter Your Bank Holder-Name"
                            className={`${styles.input}`}
                          />
                        </div>
                        <div className="">
                          <label htmlFor="  Bank-Address" className="">
                            Bank-Address
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={bankInfo.bankAddress}
                            onChange={(e) =>
                              setBankInfo({
                                ...bankInfo,
                                bankAddress: e.target.value,
                              })
                            }
                            required
                            type="Address"
                            name="bank "
                            placeholder="Enter Your   Bank-Address"
                            className={`${styles.input}`}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Submit"
                          className="w-full mt-10 h-10 rounded-full bg-gray-600  text-white "
                        />
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    {seller && seller?.withdrawMethod ? (
                      <>
                        <div className="bg-slate-100 rounded-full p-4 mt-5 w-11/12 mx-auto  flex justify-between items-start ">
                          <h5 className="text-2xl text-center mx-auto font-medium ">
                            Withdraw Methods
                          </h5>
                          <RxCross2
                            size={30}
                            onClick={() =>
                              setOpen(!open) || setWithdrawMethod(false)
                            }
                            className=" cursor-pointer"
                          />
                        </div>
                        <div className=" w-11/12 mx-auto p-5 m-1 space-y-5 ">
                          <div className="relative space-y-5 border border-slate-500/50 rounded-xl">
                            {" "}
                            <h5 className="text-md text-wrap md:text-lg  sm:text-xl font-Roboto font-medium mx-auto mt-5 text-center ">
                              Account Number:
                              {"*".repeat(
                                seller?.withdrawMethod?.bankAccountNumber
                                  .length - 3
                              ) +
                                seller?.withdrawMethod?.bankAccountNumber.slice(
                                  -3
                                )}
                            </h5>
                            <h5 className="text-md text-wrap md:text-lg  sm:text-xl font-Roboto font-medium mx-auto text-center ">
                              Bank Name :{seller?.withdrawMethod?.bankName}
                            </h5>
                            <div
                              className="absolute top-3 right-3 "
                              onClick={handleDelete}
                            >
                              <AiOutlineDelete size={30} />{" "}
                            </div>
                          </div>
                          <h5 className="text-md text-wrap md:text-lg  sm:text-xl font-Roboto font-medium mx-auto text-center ">
                            {availableBalance}${" "}
                          </h5>
                          <div className="flex items-center justify-around flex-wrap">
                            <input
                              type="number"
                              name=""
                              placeholder="Enter your withdraw amount"
                              id=""
                              onChange={(e) =>
                                setWithdrawAmount(e.target.value)
                              }
                              value={withdrawAmount}
                              className=" 800px:w-2/3  w-11/12  border-red-500 border rounded-xl px-2 mx-2 h-10"
                            />
                            <button
                              className={`${styles.button} mx-2 800px:w-2/3 w-11/12  !text-white hover:bg-slate-900`}
                              onClick={withdrawHandler}
                            >
                              WithDraw Money
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-11/12 mt-10 mx-auto">
                          <div className="bg-slate-100 rounded-full p-4 mt-5 w-11/12 mx-auto  flex justify-between items-start ">
                            <h5 className="text-2xl text-center mx-auto font-medium ">
                              No Withdraw Methods
                            </h5>
                            <RxCross2
                              size={30}
                              onClick={() =>
                                setOpen(!open) || setWithdrawMethod(false)
                              }
                              className=" cursor-pointer"
                            />
                          </div>
                          <div
                            className="flex items-center justify-center"
                            onClick={() => setWithdrawMethod(true)}
                          >
                            <div
                              className={`${styles.button} !text-white  flex `}
                            >
                              Add Now
                            </div>
                          </div>
                        </div>
                      </>
                    )}{" "}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopWithDrawMoney;
