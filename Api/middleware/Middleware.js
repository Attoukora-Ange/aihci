import jwt from "jsonwebtoken";
export const tokenTable = [];

const options = {
  expiresIn: "1d", // Délai d'expiration du JWT
};

// Génération du JWT
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, options);
};

// Authentification user du JWT
export const auth = (req, res, next) => {
  try {
    const tokenExist = req.headers.authorization;

    if (!tokenExist) return res.status(400).json({ token: "Vous n'est pas autorisé" }); //Token manquant

    const token = tokenExist && req.headers.authorization.split(" ")[1];

    if (tokenTable.includes(token))
      return res.status(400).json({ token: "Vous êtes déconnecté" }); //"Token deconnecté ou  révoqué" 

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ token: "Vous êtes déconnecté"  }); //"Token invalide"
      }
      req.user = decodedToken;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Authentification Admin du JWT
export const authAdmin = (req, res, next) => {
  try {
    const tokenExist = req.headers.authorization;

    if (!tokenExist) return res.status(400).json({ token: "Vous n'est pas autorisé" }); //"Vous n'est pas autorisé"

    const token = tokenExist && req.headers.authorization.split(" ")[1];

    if (tokenTable.includes(token))
      return res
        .status(200)
        .json({ token: "Utilisateur deconnecté" }); //"Utilisateur deconnecté ou Token révoqué"

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ token: "Vous êtes déconnecté"  }); //"Vous êtes déconnecté" 
      }
      if (!decodedToken.isAdmin)
        return res.status(400).json({ token: "Vous n'est pas autorisé" });

      req.user = decodedToken;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const authData = (req, res) => {
  return res.status(200).json({ user: req.user.id });
};
