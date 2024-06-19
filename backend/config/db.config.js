import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connect = (app) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;

    console.log("MongoDB connection with retry");

    mongoose
      .connect(MONGODB_URI, options)
      .then(() => {
        console.log("MongoDB is connected");
        app.emit("ready");
      })
      .catch((error) => {
        console.log(
          "MongoDB connection unsuccessful, retry after 2 seconds.",
          error
        );
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};

export default { connect };
