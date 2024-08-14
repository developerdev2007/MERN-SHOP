import Profile from "../Profile/Profile";
import Orders from "../Profile/Orders";
import Refunds from "../Profile/Refunds";
import TrackOrders from "../Profile/TrackOrders";
import ChangePassword from "../Profile/ChangePassword";
import Address from "../Profile/Address";

const ProfileContent = ({ active }) => {
  return (
    <>
      <div className="w-full">
        {active === 1 ? (
          <>
            {/* profile  */}
            <Profile />
          </>
        ) : active === 2 ? (
          //   orders
          <>
            <Orders />
          </>
        ) : active === 3 ? (
          //   refunds
          <>
            <Refunds />
          </>
        ) : active === 4 ? (
          //   inbox
          <></>
        ) : active === 5 ? (
          //   track orders
          <>
            <TrackOrders />
          </>
        ) : active === 6 ? (
          //   payment Methods
          <>
            {/* <PaymentMethod /> */}
            <ChangePassword />
          </>
        ) : active === 7 ? (
          //   Address
          <>
            <Address />
          </>
        ) : active === 7 ? (
          //Login/out
          <></>
        ) : null}
      </div>
    </>
  );
};

export default ProfileContent;
