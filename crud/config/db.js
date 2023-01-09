import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
