import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Stack, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhoneNumber } from "../../context/useFonction";
import { useState } from "react";
import axios from "axios";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#0175C4",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  marginBottom: 5,
  textDecoration: "none",
  transition: "color .3s ease-in-out",
  "&:hover": {
    color: "#01cccc",
  },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 12,
    margin: 50,
    padding: "10px",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: "10px",
    width: "100%",
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const profession = [
  "Interne en pharmacie",
  "Interne en médecine",
  "Etudiant en pharmacie",
  "Etudiant en médecine",
];
const pays = [
  "Bénin",
  "Burkina Faso",
  "Côte d'Ivoire",
  "Guinée-Bisseau",
  "Mali",
  "Niger",
  "Sénégal",
  "Togo",
];

export const RegisterDetail = () => {
  const [erreur, setErreur] = useState();
  const [user, setUser] = useState({
    profession: "",
    nom_prenoms: "",
    pays: "",
    telephone: "",
    email: "",
    password_conf: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErreur(null);
  };
  const handleChangeAutocomplete = (name) => (event, newValeur) => {
    setUser((prev) => ({
      ...prev,
      [name]: newValeur,
    }));
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const option = {};

    try {
      if (!isValidEmail(user.email)) return setErreur("Email n'est pas valide");

      if (!isValidPhoneNumber(user.telephone))
        return setErreur("Le numero doit comporter 10 chiffres");

      if (user.password !== user.password_conf)
        return setErreur("Les mots de passe saisis ne correspondent pas");

      await axios
        .post(`${process.env.REACT_APP_API}/user`, user, option)
        .then(() => {
          navigate("/connexion");
        })
        .catch((err) =>
          setErreur(err.response.data.error || err.response.data.userExist)
        );
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Stack gap={1} justifyContent="center" component="form">
      <Typography
        variant="body2"
        component="div"
        color="red"
        textAlign="center"
      >
        {erreur}
      </Typography>
      <StyledAutocomplete
        size="small"
        disablePortal
        id="profession"
        options={profession}
        renderInput={(params) => <TextField {...params} label="Profession" />}
        onChange={handleChangeAutocomplete("profession")}
      />
      <StyledTextField
        id="nom_prenoms"
        label="Nom et prénoms"
        type="text"
        variant="outlined"
        size="small"
        name="nom_prenoms"
        value={user.nom_prenoms}
        onChange={handleChange}
      />
      <StyledAutocomplete
        size="small"
        disablePortal
        id="pays"
        options={pays}
        renderInput={(params) => <TextField {...params} label="Pays" />}
        onChange={handleChangeAutocomplete("pays")}
      />
      <StyledTextField
        id="telephone"
        label="Numéro tél"
        type="tel"
        variant="outlined"
        size="small"
        name="telephone"
        value={user.telephone}
        onChange={handleChange}
      />
      <StyledTextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        size="small"
        name="email"
        onChange={handleChange}
      />
      <StyledTextField
        id="password"
        label="Choisir un mot de passe"
        type="password"
        variant="outlined"
        autoComplete="false"
        size="small"
        name="password"
        onChange={handleChange}
      />
      <StyledTextField
        id="password_conf"
        label="Répéter le mot de passe"
        type="password"
        variant="outlined"
        autoComplete="false"
        size="small"
        name="password_conf"
        onChange={handleChange}
      />
      <StyledButton
        onClick={handleClick}
        variant="contained"
        color="success"
        disableElevation
      >
        Envoyez
      </StyledButton>
      <StyledLink to="/connexion">Déjà inscrit(e) ? Je me connecte</StyledLink>
    </Stack>
  );
};
