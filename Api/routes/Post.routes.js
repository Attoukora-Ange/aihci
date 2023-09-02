import express from "express";
import { auth, authAdmin } from "../middleware/Middleware.js";
import {
  deleteOnePostAgendaRoute,
  deleteOnePostArticleRoute,
  deleteOnePostContactRoute,
  deleteOnePostFormationRoute,
  deleteOnePostImageRoute,
  deleteOnePostOrganigrameRoute,
  deleteOnePostSoumissionRoute,
  getAllPostsAgendaRoute,
  getAllPostsArticleRoute,
  getAllPostsContactRoute,
  getAllPostsFormationRoute,
  getAllPostsImageRoute,
  getAllPostsOrganigrameRoute,
  getAllPostsSoumissionRoute,
  getOnePostAgendaRoute,
  getOnePostArticleRoute,
  getOnePostContactRoute,
  getOnePostFormationRoute,
  getOnePostImageRoute,
  getOnePostOrganigrameRoute,
  getOnePostSoumissionRoute,
  postCreateOnePostAgendaRoute,
  postCreateOnePostArticleRoute,
  postCreateOnePostContactRoute,
  postCreateOnePostFormationRoute,
  postCreateOnePostImageRoute,
  postCreateOnePostOrganigrameRoute,
  postCreateOnePostSoumissionRoute,
  putOnePostAgendaRoute,
  putOnePostArticleRoute,
  putOnePostFormationRoute,
  putOnePostImageRoute,
  putOnePostOrganigrameRoute,
} from "../controllers/PostController.js";
import multer from "multer";

export const postRoutes = express.Router();

// Fonction de stockage de multer
const storage = multer.diskStorage({})

// Fonction de filtrage de fichier de fichier image
const fileFilterImage = (_, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Type de fichier non pris en charge (.jpeg, .jpg, .png)"),
      false
    );
  }
};

// Fonction de filtrage de fichier de fichier texte
const fileFilterText = (_, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Type de fichier non pris en charge (.docx, .ppt, .pdf, .txt)"),
      false
    );
  }
};

//Fonction de chargement du fichier
const upload = (fieldName, filter) =>
  multer({ storage: storage, fileFilter: filter }).single(fieldName);

//Fonction de gestion d'erreur du multer
const multerErrorMiddleware = (err, _, res, next) => {
  if (err) return res.status(415).json({ error: err.message });
  next();
};

// Configuration de routes Article
postRoutes.get("/article", getAllPostsArticleRoute);
postRoutes.get("/article/:id", auth, getOnePostArticleRoute);
postRoutes.post(
  "/article",
  authAdmin,
  upload("image_article", fileFilterImage),
  multerErrorMiddleware,
  postCreateOnePostArticleRoute
);
postRoutes.put(
  "/article/:id",
  authAdmin,
  upload("image_article", fileFilterImage),
  multerErrorMiddleware,
  putOnePostArticleRoute
);
postRoutes.delete("/article/:id", authAdmin, deleteOnePostArticleRoute);

// Configuration de routes Image description
postRoutes.get("/image", getAllPostsImageRoute);
postRoutes.get("/image/:id", auth, getOnePostImageRoute);
postRoutes.post(
  "/image",
  authAdmin,
  upload("image_descriptif", fileFilterImage),
  multerErrorMiddleware,
  postCreateOnePostImageRoute
);
postRoutes.put(
  "/image/:id",
  authAdmin,
  upload("image_descriptif", fileFilterImage),
  multerErrorMiddleware,
  putOnePostImageRoute
);
postRoutes.delete("/image/:id", authAdmin, deleteOnePostImageRoute);

// Configuration de routes Organigramme
postRoutes.get("/organigramme", getAllPostsOrganigrameRoute);
postRoutes.get("/organigramme/:id", auth, getOnePostOrganigrameRoute);
postRoutes.post("/organigramme", authAdmin, postCreateOnePostOrganigrameRoute);
postRoutes.put("/organigramme/:id", authAdmin, putOnePostOrganigrameRoute);
postRoutes.delete(
  "/organigramme/:id",
  authAdmin,
  deleteOnePostOrganigrameRoute
);

// Configuration de routes Formation
postRoutes.get("/formation", getAllPostsFormationRoute);
postRoutes.get("/formation/:id", auth, getOnePostFormationRoute);
postRoutes.post(
  "/formation",
  authAdmin,
  upload("image_formation", fileFilterText),
  multerErrorMiddleware,
  postCreateOnePostFormationRoute
);
postRoutes.put(
  "/formation/:id",
  authAdmin,
  upload("image_formation", fileFilterText),
  multerErrorMiddleware,
  putOnePostFormationRoute
);
postRoutes.delete("/formation/:id", authAdmin, deleteOnePostFormationRoute);

// Configuration de routes Agenda
postRoutes.get("/agenda", getAllPostsAgendaRoute);
postRoutes.get("/agenda/:id", auth, getOnePostAgendaRoute);
postRoutes.post("/agenda/", authAdmin, postCreateOnePostAgendaRoute);
postRoutes.put("/agenda/:id", authAdmin, putOnePostAgendaRoute);
postRoutes.delete("/agenda/:id", authAdmin, deleteOnePostAgendaRoute);

// Configuration de routes Soumision
postRoutes.get("/soummission", authAdmin, getAllPostsSoumissionRoute);
postRoutes.get("/soummission/:id", authAdmin, getOnePostSoumissionRoute);
postRoutes.post(
  "/soummission",
  auth,
  upload("image_soummission", fileFilterText),
  multerErrorMiddleware,
  postCreateOnePostSoumissionRoute
);
postRoutes.delete("/soummission/:id", authAdmin, deleteOnePostSoumissionRoute);

// Configuration de routes Contact
postRoutes.get("/contact", authAdmin, getAllPostsContactRoute);
postRoutes.get("/contact/:id", authAdmin, getOnePostContactRoute);
postRoutes.post("/contact", postCreateOnePostContactRoute);
postRoutes.delete("/contact/:id", authAdmin, deleteOnePostContactRoute);
