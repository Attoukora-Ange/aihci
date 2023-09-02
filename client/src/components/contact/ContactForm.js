import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { isValidEmail, isValidPhoneNumber } from "../../context/useFonction";

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

const StyledButton = styled(Button)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const civilite = ["Monsieur", "Mademoiselle", "Madame"];
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

export const ContactForm = () => {
  const [erreur, setErreur] = useState();
  const [success, setSucces] = useState();
  const [user, setUser] = useState({
    civilite: "",
    nom_prenoms: "",
    pays: "",
    telephone: "",
    email: "",
    objet: "",
    message: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSucces(null);
    setErreur(null);
  };
  const handleChangeAutocomplete = (name) => (_, newValeur) => {
    setUser((prev) => ({
      ...prev,
      [name]: newValeur,
    }));
    setSucces(null);
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const option = {};

    try {
      if (!isValidEmail(user.email)) return setErreur("Email n'est pas valide");
      if (!isValidPhoneNumber(user.telephone))
        return setErreur("Le numero doit comporter 10 chiffres");
      await axios
        .post(`${process.env.REACT_APP_API}/post/contact`, user, option)
        .then(() => {
          setSucces("Le message a été envoyé avec succès");
          setUser({
            civilite: "",
            nom_prenoms: "",
            pays: "",
            telephone: "",
            email: "",
            objet: "",
            message: "",
          });
          setErreur(null);
        })
        .catch((err) => setErreur(err.response.data.error));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Stack gap={1} justifyContent="center" component="form">
      {erreur ? (
        <Typography
          variant="body2"
          component="div"
          textAlign="left"
          color="red"
          py={1}
        >
          {erreur}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          component="div"
          textAlign="left"
          color="green"
          py={1}
        >
          {success}
        </Typography>
      )}
      <StyledAutocomplete
        size="small"
        disablePortal
        id="civilite"
        options={civilite}
        renderInput={(params) => <TextField {...params} label="Civilité" />}
        onChange={handleChangeAutocomplete("civilite")}
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
        value={user.email}
        onChange={handleChange}
      />
      <StyledTextField
        id="objet"
        label="Objet"
        type="text"
        variant="outlined"
        size="small"
        name="objet"
        value={user.objet}
        onChange={handleChange}
      />
      <StyledTextField
        id="message"
        label="Message"
        type="text"
        variant="outlined"
        size="small"
        multiline
        rows={4}
        name="message"
        value={user.message}
        onChange={handleChange}
      />
      <StyledButton onClick={handleClick} variant="contained" color="success">
        Envoyez
      </StyledButton>
    </Stack>
  );
};
