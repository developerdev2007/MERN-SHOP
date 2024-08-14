  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  CheckOutPage,
  PaymentPage,
  FaqPage,
  ProductsDetailsPage,
  SellerCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderSuccessPage,
  OrderDetailsPage,
  TrackOrderDetailsPage,
  InboxPage,
  ProfilePage,
} from "./Routes.js";

//**Shop Routes */
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductPage,
  ShopAllEventPage,
  ShopCreateEventPage,
  ShopAllCouponsPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopAllRefundPage,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopMessagingInboxPage,
} from "./routes/ShopRoutes.js";

//todo Admin Routes
import {
  AdminDashboardPage,
  AdminAllUsersPage,
  AdminAllSellersPage,
  AdminAllOrdersPage,
  AdminAllProductsPage,
  AdminAllEventsPage,
  AdminWithdrawRequestPage,
} from "./routes/AdminRoutes.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProductOfAll } from "./redux/actions/product.js";
import { getAllEventsAll } from "./redux/actions/events.js";
import ShopPreviewPage from "./pages/shop/ShopPreviewPage.jsx";
import axios from "axios";
import { server } from "./server.js";

///****+++++++++++++++++++ Stripe part
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.js";
import { useDispatch } from "react-redux";

const App = () => {
  ///****+++++++++++++++++++ Stripe part
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  ///****+++++++++++++++++++ Stripe part
  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    //** with redux */
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProductOfAll());
    dispatch(getAllEventsAll());
    getStripeApiKey();
  }, [dispatch]);
  return (
    <>
      <Router>
        {/* ///****+++++++++++++++++++ Stripe part */}
        {stripeApiKey && (
          <>
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute>
                <Routes>
                  <Route path="/payment" element={<PaymentPage />} />
                </Routes>
              </ProtectedRoute>
            </Elements>
          </>
        )}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductsDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FaqPage />} />

          <Route
            path="/profile"
            element={
              // <ProtectedRoute>
              <ProfilePage />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />

          <Route path="/order/success" element={<OrderSuccessPage />} />
          {/* !   Seller Routes  */}
          <Route path="/seller-login" element={<ShopLoginPage />} />
          <Route path="/seller-create" element={<SellerCreatePage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />

          {/* create product dashboard */}
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEventPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEventPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCouponsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithdrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-inbox"
            element={
              <SellerProtectedRoute>
                <ShopMessagingInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefundPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />

          {/* //!! Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/sellers"
            element={
              <AdminProtectedRoute>
                <AdminAllSellersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <AdminAllUsersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminAllOrdersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <AdminAllProductsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminProtectedRoute>
                <AdminAllEventsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <AdminProtectedRoute>
                <AdminWithdrawRequestPage />
              </AdminProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          // transition="Bounce"
        />
      </Router>
    </>
  );
};

export default App;
