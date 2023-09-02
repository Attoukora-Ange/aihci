import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv({ path: "./config/.env" });

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Configuration de connexion à la BD
mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => console.log("Connexion à la BD"))
  .catch((err) => console.log(err.message));

export default mongoose;
