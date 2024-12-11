import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      // autoIndex: true,
    })
    .then((data) => {
      console.log(
        `mongoDB connected Successfully with ${data.connection.host} 👍`
      );
    });
};

export default connectDB;
