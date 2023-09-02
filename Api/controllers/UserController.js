import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, tokenTable } from "../middleware/Middleware.js";

const { compare, genSalt, hash } = bcrypt;

// Configuration des controles de Routes User
export const getAllUsersRoute = async (req, res) => {
  try {
    const user = await UserModel.find().select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUserRoute = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }
    if (id !== req.user.id && !req.user.isAdmin)
      return res.status(400).json({ error: `Vous n'êtes pas autorisé` });

    const user = await UserModel.findById(id).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postCreateOneUserRoute = async (req, res) => {
  const { profession, nom_prenoms, pays, telephone, email, password } =
    req.body;
  const Salt = await genSalt(10);
  try {
    if (
      !profession ||
      !nom_prenoms ||
      !pays ||
      !telephone ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        userExist: `${email} est déjà utilisé par un autre utilisateur`,
      });
    }
    const hashPassword = await hash(password, Salt);
    const user = new UserModel({
      profession,
      nom_prenoms,
      pays,
      telephone,
      email,
      password,
      password: hashPassword,
      isAdmin: false,
    });
    user
      .save()
      .then(() => {
        console.log(`${user.nom_prenoms} à été créé avec succès`);
        delete user._doc.password;
        return res.status(201).json({
          user,
          success: `${user.nom_prenoms} à été créé avec succès`,
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postConnectOneUserRoute = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "vérifier les champs du formulaire" });
    }
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        userExist: "L'email ou le mot de passe n'est pas correct",
      });
    }
    const userVerifyHashPassword = await compare(password, userExist.password);
    if (!userVerifyHashPassword) {
      return res
        .status(400)
        .json({ userExist: "L'email ou le mot de passe n'est pas correct" });
    }
    const token = generateAccessToken({
      id: userExist._id.toString(),
      isAdmin: userExist.isAdmin,
    });
    delete userExist._doc.password;
    return res.status(200).json({ user: userExist, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const postDisconnectOneUserRoute = async (req, res) => {
  try {
    const tokenExist = req.headers.authorization;
    const token = tokenExist && req.headers.authorization.split(" ")[1];

    tokenTable.push(token);

    return res
      .status(200)
      .json({ token: "Token révoqué avec success : utilisateur déconnecté" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putOneUserRoute = async (req, res) => {
  const { id } = req.params;
  const {
    profession,
    nom_prenoms,
    pays,
    telephone,
    email,
    newPassword,
    holdPassword,
    matrimoniale,
    loge,
    service,
    structure,
  } = req.body;
  const Salt = await genSalt(10);
  let user = "";

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: `${id} n'est pas valide` });

    if (id !== req.user.id && !req.user.isAdmin)
      return res.status(400).json({ error: `Vous n'êtes pas autorisé` });

    const userFind = await UserModel.findById(id);

    if (!userFind)
      return res
        .status(400)
        .json({ error: `L'utilisateur n'a pas été trouvé` });

    const hashPassword = await hash(newPassword, Salt);

    //Seul l'admin peut modifier le mot de passe sans vérification de lancien mot de passe
    if (req.user.isAdmin) {
      if (!newPassword) {
        return res.status(400).json({
          error: "Vérifier le champs nouveau mot de passe du formulaire",
        });
      }
      const userModif = await UserModel.findByIdAndUpdate(
        id,
        {
          $set: {
            password: hashPassword,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: `Le mot de passe de ${userModif.nom_prenoms} a été modifié avec succès`,
      });
    }

    //Quand il s'agit de l'utilisateur on verifie s'il a bien saisi les champs Obligatoire
    if (!profession || !nom_prenoms || !pays || !telephone || !email) {
      return res
        .status(400)
        .json({ error: "Vérifier les champs du formulaire obligatoire (*)" });
    }

    //On verifie si l(utilisateur entré les password)
    if (holdPassword || newPassword) {
      const IsValidPassword = await compare(holdPassword, userFind.password);
      if (!IsValidPassword) {
        return res
          .status(400)
          .json({ error: `L'ancien mot de passe est incorect` });
      }

      user = await UserModel.findByIdAndUpdate(
        id,
        {
          $set: {
            profession,
            nom_prenoms,
            pays,
            telephone,
            email,
            matrimoniale,
            loge,
            service,
            structure,
            password: hashPassword,
          },
        },
        { new: true }
      );
      delete user._doc.password;
      return res
        .status(200)
        .json({ user, success: "Modification du profil a réussi" });
    }

    user = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          profession,
          nom_prenoms,
          pays,
          telephone,
          email,
          matrimoniale,
          loge,
          service,
          structure,
        },
      },
      { new: true }
    );
    delete user._doc.password;
    return res
      .status(200)
      .json({ user, success: "Modification du profil a réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putPasswordOneUserRoute = async (req, res) => {
  const { id } = req.params;
  const { newPassword, holdPassword } = req.body;
  const Salt = await genSalt(10);
  try {
    if (!newPassword || !holdPassword) {
      return res.status(400).json({ error: "Vérifier les champs" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    if (id !== req.user.id && !req.user.isAdmin)
      return res.status(400).json({ error: `Vous n'êtes pas autorisé` });

    const userFind = await UserModel.findById(id);

    //Seul l'admin peut modifier le mot de passe sans vérification de lancien mot de passe
    if (req.user.isAdmin) {
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          $set: {
            password: hashPassword,
          },
        },
        { new: true }
      );
      delete user._doc.password;
      return res.status(200).json({ user, success: "Modification réussi" });
    }

    const IsValidPassword = await compare(holdPassword, userFind.password);

    if (!IsValidPassword) {
      return res
        .status(400)
        .json({ error: `L'ancien mot de passe est incorect` });
    }

    const hashPassword = await hash(newPassword, Salt);
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          password: hashPassword,
        },
      },
      { new: true }
    );

    delete user._doc.password;
    return res.status(200).json({ user, success: "Modification réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneUserRoute = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} n'est pas valide` });
    }

    if (id !== req.user.id && !req.user.isAdmin)
      return res.status(400).json({ error: `Vous n'êtes pas autorisé` });

    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({ success: "Suppression réussi" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
