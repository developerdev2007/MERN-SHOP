import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/dataBase.js";
// import { getHashes } from "crypto";

///*** HAndling Exception */
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting Down  the server handling Uncaught Exception");
});
//*** */ config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/.env" });
}
///***Connect Db  */
connectDB();
//////***Server  */
app.get("/", (req, res) => {
  res.send("e-shop server");
});
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Time in  hh::mm ${new Date(Date.now()).getHours()} ${new Date(
      Date.now()
    ).getMinutes()}`
  );
  console.log(`Server is Running on http://localhost:${process.env.PORT}`);
  console.log("Server is Running Well 👍");
});

//*** unHandledPromise Rejection */
process.on("unhandledRejection", (err) => {
  console.log(`shutting Down for ${err.message} `);
  console.log(`shutting Down for unHandledPromise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
