import mongoose from "mongoose";
import {
  AgendaModel,
  ArticleModel,
  ContactModel,
  FormationModel,
  ImageModel,
  OrganigrammeModel,
  SoumissionModel,
} from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../helper/upload.js";

// Configuration des controles de Routes Article
export const getAllPostsArticleRoute = async (_, res) => {
  try {
    const post = await ArticleModel.find()
      .populate("admin", "nom_prenoms")
      .sort({ createdAt: -1 });
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostArticleRoute = async (req, res) => {
  const { id } = req.params;
  const idUser = req.user._id
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const post = await ArticleModel.findById(id).populate(
      "admin",
      "nom_prenoms"
    );
    const user = await UserModel.findById(idUser)

    await UserModel.findByIdAndUpdate(
      idUser,
      {
        $set: {
          visite: Number(user.visite) + 1,
        },
      },
      { new: true }
    );
    await ArticleModel.findByIdAndUpdate(
      id,
      {
        $set: {
          lu: Number(post.lu) + 1,
        },
      },
      { new: true }
    );

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostArticleRoute = async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;
  const fichier = req.file;
  try {
    if (!title || !content || !fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }
    const postExist = await ArticleModel.findOne({ title });
    if (postExist) {
      return res.status(400).json({
        postExist: "Ce titre est déjà créé",
      });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/articles",
    });

    const post = new ArticleModel({
      title,
      content,
      fichier: postPhoto.secure_url,
      admin: userId,
    });
    post
      .save()
      .then(() => {
        console.log(`${post.title} à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOnePostArticleRoute = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const fichier = req.file;
  try {
    if (!title || !content || !fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/articles",
    });

    const post = await ArticleModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          content,
          fichier: postPhoto.secure_url,
        },
      },
      { new: true }
    );
    return res.status(200).json({ post, success: "Modification réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostArticleRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await ArticleModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "L'article à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Image
export const getAllPostsImageRoute = async (_, res) => {
  try {
    const post = await ImageModel.findOne()
      .sort({ createdAt: -1 })
      .populate("admin", "nom_prenoms");
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostImageRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await ImageModel.findById(id).populate("admin", "nom_prenoms");
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostImageRoute = async (req, res) => {
  const userId = req.user.id;
  const fichier = req.file;
  try {
    if (!fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/image_description",
    });

    const post = new ImageModel({
      fichier: postPhoto.secure_url,
      admin: userId,
    });

    post
      .save()
      .then(() => {
        console.log(`L'image à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOnePostImageRoute = async (req, res) => {
  const { id } = req.params;
  const fichier = req.file;
  try {
    if (!fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "ahici/image_description",
    });

    const post = await ImageModel.findByIdAndUpdate(
      id,
      {
        $set: { fichier: postPhoto.secure_url },
      },
      { new: true }
    );
    return res.status(200).json({ post, success: "Modification réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostImageRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await ImageModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "L'image à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Organigramme
export const getAllPostsOrganigrameRoute = async (_, res) => {
  try {
    const post = await OrganigrammeModel.find().populate(
      "admin",
      "nom_prenoms"
    );
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostOrganigrameRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await OrganigrammeModel.findById(id).populate(
      "admin",
      "nom_prenoms"
    );
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostOrganigrameRoute = async (req, res) => {
  const userId = req.user.id;
  const { fonction, responsable } = req.body;
  try {
    if (!fonction || !responsable) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }

    const post = new OrganigrammeModel({
      fonction,
      responsable,
      admin: userId,
    });
    post
      .save()
      .then(() => {
        console.log(`Un organigramme à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOnePostOrganigrameRoute = async (req, res) => {
  const { id } = req.params;
  const { fonction, responsable } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const post = await OrganigrammeModel.findByIdAndUpdate(
      id,
      {
        $set: { fonction, responsable },
      },
      { new: true }
    );
    return res.status(200).json({ post, success: "Modification d'un responsable a réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostOrganigrameRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await OrganigrammeModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "L'article à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Formation
export const getAllPostsFormationRoute = async (_, res) => {
  try {
    const post = await FormationModel.find()
      .populate("admin", "nom_prenoms")
      .sort({ created: -1 });
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostFormationRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await FormationModel.findById(id).populate(
      "admin",
      "nom_prenoms"
    );
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostFormationRoute = async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;
  const fichier = req.file;
  try {
    if (!title || !content || !fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }
    const postExist = await FormationModel.findOne({ title });
    if (postExist) {
      return res.status(400).json({
        postExist: "Ce titre est déjà crée",
      });
    }
    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/formation",
    });

    const post = new FormationModel({
      title,
      content,
      fichier: postPhoto.secure_url,
      admin: userId,
    });
    post
      .save()
      .then(() => {
        console.log(`${post.title} à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOnePostFormationRoute = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const fichier = req.file;
  try {
    if (!title || !content || !fichier) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/formation",
    });
    const post = await FormationModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          content,
          fichier: postPhoto.secure_url,
        },
      },
      { new: true }
    );
    return res.status(200).json({ post, success: "Modification réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostFormationRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await FormationModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "L'article à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Formation
export const getAllPostsAgendaRoute = async (_, res) => {
  try {
    const post = await AgendaModel.find().populate("admin", "nom_prenoms");
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostAgendaRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await AgendaModel.findById(id).populate(
      "admin",
      "nom_prenoms"
    );
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostAgendaRoute = async (req, res) => {
  const userId = req.user.id;
  const { title, date } = req.body;
  console.log({ title, date });
  try {
    if (!title || !date) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }
    const postExist = await AgendaModel.findOne({ title });
    if (postExist) {
      return res.status(400).json({
        postExist: "Ce titre est déjà crée",
      });
    }
    const post = new AgendaModel({
      title,
      date,
      admin: userId,
    });
    post
      .save()
      .then(() => {
        console.log(`${post.title} à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOnePostAgendaRoute = async (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;
  try {
    if (!title || !date) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    const post = await AgendaModel.findByIdAndUpdate(
      id,
      {
        $set: { title, date },
      },
      { new: true }
    );
    return res.status(200).json({
      post,
      success: "La modification de l'agenda a été ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostAgendaRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await AgendaModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "L'article à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Soummision
export const getAllPostsSoumissionRoute = async (_, res) => {
  try {
    const post = await SoumissionModel.find().sort({ updatedAt: -1 });
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostSoumissionRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await SoumissionModel.findById(id);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostSoumissionRoute = async (req, res) => {
  const userId = req.user.id;
  const fichier = req.file;
  try {
    if (!fichier) {
      return res
        .status(400)
        .json({ error: "vérifier le champs du formulaire" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Vous n'est pas autorisé" });
    }
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        postExist:
          "Cet utilisateur n'est pas autorisé à soumettre les informations",
      });
    }

    const postPhoto = await cloudinary.uploader.upload(fichier.path, {
      folder: "aihci/soumission",
    });

    const post = new SoumissionModel({
      profession: userExist.profession,
      nom_prenoms: userExist.nom_prenoms,
      pays: userExist.pays,
      telephone: userExist.telephone,
      email: userExist.email,
      fichier: postPhoto.secure_url,
    });
    post
      .save()
      .then(() => {
        console.log(`Le fichier à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostSoumissionRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await SoumissionModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "Le fichier à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Configuration des controles de Routes Contact
export const getAllPostsContactRoute = async (_, res) => {
  try {
    const post = await ContactModel.find().sort({ updatedAt: -1 });
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePostContactRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    const post = await ContactModel.findById(id);

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOnePostContactRoute = async (req, res) => {
  const { civilite, nom_prenoms, pays, telephone, email, objet, message } =
    req.body;
  try {
    if (
      !civilite ||
      !nom_prenoms ||
      !pays ||
      !telephone ||
      !email ||
      !objet ||
      !message
    ) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    const post = new ContactModel({
      civilite,
      nom_prenoms,
      pays,
      telephone,
      email,
      objet,
      message,
    });
    post
      .save()
      .then(() => {
        console.log(`Un message à été ajouté avec succès`);
        return res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePostContactRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    await ContactModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "Le message à été supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
