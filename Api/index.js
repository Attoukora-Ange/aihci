import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import "./config/database.js";
import { auth, authData } from "./middleware/Middleware.js";
import { userRoutes } from "./routes/User.routes.js";
import { postRoutes } from "./routes/Post.routes.js";

configDotenv({ path: "./config/.env" }); // Configuration de dotenv

// Configuration de base express
const App = express();

// Configuration de CORS
const corsOptions = {
  origin: process.env.CLIENT, 
  methods: ["GET", "PUT", "POST", "DELETE"],
};

App.use(cors(corsOptions));

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static("images"));

App.use("/auth", auth, authData);
App.use("/api/user", userRoutes);
App.use("/api/post", postRoutes);

const PORT = process.env.PORT || 5000; //Port de connexion
App.listen(PORT, () => console.log(`Server démarré au port ${PORT}`));
