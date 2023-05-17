import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;

export default db;