import express from "express";
import {
  deleteOneUserRoute,
  getAllUsersRoute,
  getOneUserRoute,
  postConnectOneUserRoute,
  postCreateOneUserRoute,
  postDisconnectOneUserRoute,
  putOneUserRoute,
  putPasswordOneUserRoute,
} from "../controllers/UserController.js";
import { auth, authAdmin } from "../middleware/Middleware.js";

export const userRoutes = express.Router();

// Configuration de routes user
userRoutes.get("/", authAdmin, getAllUsersRoute);
userRoutes.get("/:id", auth, getOneUserRoute);
userRoutes.post("/", postCreateOneUserRoute);
userRoutes.post("/connexion", postConnectOneUserRoute);
userRoutes.post("/deconnexion", postDisconnectOneUserRoute);
userRoutes.put("/:id", auth, putOneUserRoute);
userRoutes.put("/pasword/:id", auth, putPasswordOneUserRoute);
userRoutes.delete("/:id", authAdmin, deleteOneUserRoute);
