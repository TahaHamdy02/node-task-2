const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/auth";
const connectionToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed: ", error.message);
    process.exit(1);
  }
};
module.exports = connectionToDatabase;
