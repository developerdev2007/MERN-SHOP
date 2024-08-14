import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `mongoDB connected Successfully with ${data.connection.host} 👍`
      );
    });
};

export default connectDB;
