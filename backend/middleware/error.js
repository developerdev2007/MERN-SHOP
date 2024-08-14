import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Internal Server Error";
  ///*** Wrong Mongodb Url */
  if (err.name === "CastError") {
    const message = `Resources Not Found with this id ., Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //***Duplicate key Error */
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  ///***wrong Jwt Error */
  if (err.name === "JsonWebTokenError") {
    const message = `Your URL is invalid please try again latter`;
    err = new ErrorHandler(message, 400);
  }
  //*** Json Web token Expired */
  if (err.name === "TokenExpiredError") {
    const message = `Your URL is expired , please try again latter `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
