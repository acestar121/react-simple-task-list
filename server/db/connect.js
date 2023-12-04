const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI).then(() => {
      console.log("mongoDB connected ...");
    });
  } catch (err) {
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDatabase;
