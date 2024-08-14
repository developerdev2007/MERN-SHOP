import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

import { Country, State } from "country-state-city";
import { deleteUserAddress, updateUserAddress } from "../../redux/actions/user";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { user, error, isLoading, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message?.message);
    }
    console.log("''''''''");
    console.log(user, error, isLoading + " address " + message?.message);
  }, [error, message, user]);

  //// !!!-----------------types of addresses---------------------------
  const addressTypesData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("please Fill out the all fields ");
    } else {
      ///! redux logic
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setAddress1("");
      setAddress2("");
      setCity("");
      setZipCode("");
      setAddressType("");
      setCountry("");
    }
  };

  //!!!--------------handle delete

  const handleDelete = async (data) => {
    // console.log(data);
    dispatch(deleteUserAddress(data?._id));
    dispatch({
      type: "clearErrors",
    });
    dispatch({
      type: "clearMessage",
    });
  };

  return (
    <>
      <div className="w-full px-4">
        <div className="flex items-center justify-between w-full ">
          {open && (
            <>
              <div className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-screen bg-black/55">
                <div className="relative w-2/4 overflow-y-scroll rounded-lg shadow-lg bg-white/90 h-3/4 shadow-teal-500/80">
                  <div
                    className="absolute right-3 top-3"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 size={30} className="cursor-pointer" />{" "}
                  </div>

                  <h3 className="w-full mt-10 text-3xl text-center font-Poppins ">
                    Add New Address
                  </h3>
                  <div className="flex items-center justify-center w-full">
                    <form
                      aria-required
                      onSubmit={handleSubmit}
                      className="w-full "
                    >
                      <div className="block w-full p-4 ">
                        <div className="w-11/12 mx-auto mb-2">
                          <label className="w-full pb-2 ">Country</label>
                          <select
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                            name=""
                            id=""
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="" className="block pb-2 ">
                              Choose Your Country
                            </option>
                            {Country &&
                              Country.getAllCountries().map((data) => (
                                <>
                                  <option
                                    key={data?.isoCode}
                                    value={data?.isoCode}
                                    className="block pb-2"
                                  >
                                    {data?.name}
                                  </option>
                                </>
                              ))}{" "}
                          </select>
                        </div>
                        {/* //////______________________________________________________ */}
                        <div className="w-11/12 mx-auto mb-2">
                          <label className="w-full pb-2 ">State</label>
                          <select
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                            name=""
                            id=""
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option value="" className="block pb-2 ">
                              Choose Your State
                            </option>
                            {State &&
                              State.getStatesOfCountry(country).map((data) => (
                                <>
                                  <option
                                    key={data?.isoCode}
                                    value={data?.isoCode}
                                    className="block pb-2"
                                  >
                                    {data?.name}
                                  </option>
                                </>
                              ))}
                          </select>
                        </div>

                        <div className="w-11/12 pb-2 mx-auto">
                          <label htmlFor="address1" className="block pb-2 ">
                            Address1
                          </label>
                          <input
                            type="address"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                          />
                        </div>

                        {/* //////++++++++++++++++++++++++++++++++++++ */}
                        <div className="w-11/12 pb-2 mx-auto">
                          <label htmlFor="address2" className="block pb-2 ">
                            Address2
                          </label>
                          <input
                            type="address"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            required
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                          />
                        </div>

                        {/* /////>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                        <div className="w-11/12 pb-2 mx-auto">
                          <label htmlFor="zipCode" className="block pb-2 ">
                            zipCode
                          </label>
                          <input
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                          />
                        </div>
                        {/* /////______________________________________________________ */}

                        <div className="w-11/12 mx-auto mb-2">
                          <label className="w-full pb-2 ">Address type</label>
                          <select
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                            name=""
                            id=""
                            value={addressType}
                            onChange={(e) => setAddressType(e.target.value)}
                          >
                            <option value="" className="block pb-2 ">
                              Choose Your Address Type
                            </option>
                            {addressTypesData &&
                              addressTypesData.map((data) => (
                                <>
                                  <option
                                    key={data?.name}
                                    value={data?.name}
                                    className="block pb-2"
                                  >
                                    {data?.name}
                                  </option>
                                </>
                              ))}
                          </select>
                        </div>

                        {/* //////)))))))))))))))))))))))))) */}
                        <div className="w-11/12 pb-2 mx-auto">
                          <label htmlFor="zipCode" className="block pb-2 ">
                            Submit
                          </label>
                          <input
                            type="submit"
                            className="w-full h-8 overflow-hidden border-2 rounded-md focus:outline-teal-500 focus:ring-teal-600 border-teal-500/90"
                            readOnly
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
          <h1 className="font-semibold text-2xl text-[#000000ba] pb-2     ">
            My Address
          </h1>
          <div
            className={`${styles.button} !rounded-lg`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>
        <br />
        {user &&
          user?.addresses?.map((address, index) => (
            <>
              <div
                key={index}
                className="flex items-center justify-between w-full h-16 px-3 pr-10 mt-5 bg-white rounded-md shadow-lg "
              >
                <div className="flex items-center">
                  {" "}
                  <h5 className="pl-5 font-medium">{address?.addressType}</h5>
                </div>
                <div className="flex items-center pl-8">
                  <h6 className="font-medium">
                    {address?.address1} + {address?.address2}
                  </h6>
                </div>
                <div className="flex items-center pl-8">
                  <h6 className="font-medium">{user && user?.phoneNumber}</h6>
                </div>
                <div
                  className="min-w-[10%}"
                  onClick={() => handleDelete(address)}
                >
                  <AiOutlineDelete size={25} />
                </div>
              </div>
            </>
          ))}

        {user && user?.addresses?.length === 0 && (
          <>
            <div className="flex items-end justify-center w-full ">
              <h5 className="text-3xl font-semibold text-center text-sky-700">
                You Don`t have any saved address!!!
              </h5>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Address;
