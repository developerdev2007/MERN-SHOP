import dotenv from "dotenv";
import Express from "express";
import ErrorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import user from "./controllers/user.js";
import shop from "./controllers/shop.js";
import product from "./controllers/product.js";
import event from "./controllers/event.js";
import coupon from "./controllers/couponCode.js";
import payment from "./controllers/payment.js";
import order from "./controllers/order.js";
import conversation from "./controllers/conversation.js";
import message from "./controllers/message.js";
import withdraw from "./controllers/withdraw.js";
import path from "path";
const app = Express();

app.use(Express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-shop-sirj.vercel.app",
    credentials: true,
  })
);
app.use("/", Express.static(path.join(__dirname, "/uploads")));
app.use("/test", (req, res, next) => {
  res.send("Hello world!!");
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ extended: true, limit: "50mb" }));

app.use(Express.json());

///***config*/
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "config/.env" });
}
///***Using Routes */
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

//*** For Error handling */
app.use(ErrorHandler);

export default app;
