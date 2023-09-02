import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
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
  width: "100%",
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

export const AdminDetail = () => {
  return (
    <Stack gap={1} justifyContent="center" component="form">
      <StyledAutocomplete
        size="small"
        disablePortal
        id="profession"
        options={profession}
        renderInput={(params) => <TextField {...params} label="Profession" />}
      />
      <StyledTextField
        id="nom"
        label="Nom et prénoms"
        type="text"
        variant="outlined"
        size="small"
      />
      <StyledAutocomplete
        size="small"
        disablePortal
        id="pays"
        options={pays}
        renderInput={(params) => <TextField {...params} label="Pays" />}
      />
      <StyledTextField
        id="numero"
        label="Numéro tél"
        type="tel"
        variant="outlined"
        size="small"
      />
      <StyledTextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        size="small"
      />
      <StyledTextField
        id="password"
        label="Choisir un mot de passe"
        type="password"
        variant="outlined"
        size="small"
      />
      <StyledTextField
        id="password-conf"
        label="Répéter le mot de passe"
        type="password"
        variant="outlined"
        size="small"
      />
      <StyledButton variant="contained" color="success">
        Envoyez
      </StyledButton>
      <StyledLink to="/connexion">Déjà inscrit(e) ? Je me connecte</StyledLink>
    </Stack>
  );
};
