import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { isValidEmail, isValidPhoneNumber } from "../../context/useFonction";
import { useUserContexte } from "../../context/UserContext";
import { useState } from "react";
import axios from "axios";

const StyledAutocomplete = styled(Autocomplete)(() => ({
  width: "100%",
}));

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const StyledButton = styled(Button)(() => ({
  width: "100%",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    flexDirection: "column",
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

const matrimoniale = ["Célibataire", "Marié(e)", "Autres"];
const loge = ["Logé(e)", "Non logé(e)"];

export const RegisterModification = ({ member }) => {
  const admin = useUserContexte().user.isAdmin;
  const [erreur, setErreur] = useState();
  const [succes, setSucces] = useState();
  const [user, setUser] = useState({
    profession: "",
    nom_prenoms: "",
    pays: "",
    telephone: "",
    email: "",
    holdPassword: "",
    newPassword: "",
    matrimoniale: "",
    loge: "",
    service: "",
    structure: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErreur(null);
    setSucces(null)
  };

  const handleChangeAutocomplete = (name) => (_, newValeur) => {
    setUser((prev) => ({
      ...prev,
      [name]: newValeur,
    }));
    setErreur(null);
    setSucces(null)
  };

  const handleAnnuler = () => {
    setErreur(null);
    setSucces(null);
    admin && member.setAffichage(false);
  };

  const handleClick = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      if (!admin) {
        if (!isValidEmail(user.email))
          return setErreur("Email n'est pas valide");

        if (!isValidPhoneNumber(user.telephone))
          return setErreur("Le numero doit comporter 10 chiffres");
      }
      await axios
        .put(`${process.env.REACT_APP_API}/user/${id}`, user, option)
        .then((res) => {
          setSucces(res.data.success);
          setErreur(null);
          member.setChange(!member.change)
          member.setAffichage(true);
        })
        .catch((err) => {
          setSucces(null);
          setErreur(err.response.data.error || err.response.data.token);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {admin ? (
        //Quand il s'agit de l'admin
        <Stack
          width="100%"
          gap={1}
          justifyContent="center"
          alignItems="center"
          component="form"
        >
          {erreur ? (
            <Typography
              variant="body2"
              component="div"
              color="red"
              textAlign="center"
            >
              {erreur}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              component="div"
              color="green"
              textAlign="center"
            >
              {succes}
            </Typography>
          )}
          <StyledTextField
            disabled
            id="nom_prenoms"
            label="Nom et prénoms*"
            type="text"
            variant="outlined"
            size="small"
            name="nom_prenoms"
            value={user.nom_prenoms || member.user?.nom_prenoms}
            onChange={handleChange}
          />
          <StyledTextField
            disabled
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            name="email"
            value={user.email || member.user?.email}
            onChange={handleChange}
          />
          <StyledTextField
            id="newPassword"
            label="Nouveau mot de passe*"
            type="password"
            variant="outlined"
            autoComplete="false"
            size="small"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
          />
          <Stack direction="row" sx={{ width: "50%" }} gap={1}>
            <StyledButton
              variant="contained"
              color="success"
              disableElevation
              onClick={handleClick(member.user?._id)}
            >
              Modifier
            </StyledButton>
            <StyledButton
              variant="contained"
              color="error"
              disableElevation
              onClick={handleAnnuler}
            >
              Annuler
            </StyledButton>
          </Stack>
        </Stack>
      ) : (
        //Quand il s'agit de l'utilisateur simplement
        <StyledStack direction="row" gap={1}>
          <Stack flex={1} gap={1}>
            <Typography variant="h5" component="div" textAlign="center" py={2} color="#099e4c">
              Information utilisateur
            </Typography>
            <Box
              sx={{
                border: "1px solid black",
                borderRadius: 1,
                p: 2,
                width: "100%",
              }}
            >
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Profession :{" "}
                </Typography>
                {member.user?.profession}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Nom et Prénoms :{" "}
                </Typography>
                {member.user?.nom_prenoms}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Pays :{" "}
                </Typography>
                {member.user?.pays}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Situation matrimoniale :{" "}
                </Typography>
                {member.user?.matrimoniale}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Numéro tél :{" "}
                </Typography>
                {member.user?.telephone}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Email :{" "}
                </Typography>
                {member.user?.email}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Logé à l'internat :{" "}
                </Typography>
                {member.user?.loge}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Structure :{" "}
                </Typography>
                {member.user?.structure}
              </Typography>
              <Typography variant="h6" component="div" fontWeight={500}>
                <Typography variant="body2" component="span" fontWeight={300}>
                  Service :{" "}
                </Typography>
                {member.user?.service}
              </Typography>
            </Box>
          </Stack>
          <Stack flex={1} gap={1} mt={2} component="form">
            {erreur ? (
              <Typography
                variant="body2"
                component="div"
                color="red"
                textAlign="center"
              >
                {erreur}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                component="div"
                color="green"
                textAlign="center"
              >
                {succes}
              </Typography>
            )}

            <StyledAutocomplete
              size="small"
              disablePortal
              id="profession"
              options={profession}
              renderInput={(params) => (
                <TextField {...params} label="Profession*" />
              )}
              onChange={handleChangeAutocomplete("profession")}
            />
            <StyledTextField
              id="nom_prenoms"
              label="Nom et prénoms*"
              type="text"
              variant="outlined"
              size="small"
              name="nom_prenoms"
              value={user.nom_prenoms || member.user?.nom_prenoms}
              onChange={handleChange}
            />
            <StyledAutocomplete
              size="small"
              disablePortal
              id="pays"
              options={pays}
              renderInput={(params) => <TextField {...params} label="Pays*" />}
              onChange={handleChangeAutocomplete("pays")}
            />
            <StyledTextField
              id="telephone"
              label="Numéro tél*"
              type="tel"
              variant="outlined"
              size="small"
              name="telephone"
              value={user.telephone || member.user?.telephone}
              onChange={handleChange}
            />
            <StyledTextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              name="email"
              value={user.email || member.user?.email}
              onChange={handleChange}
            />
            <StyledAutocomplete
              id="matrimoniale"
              size="small"
              disablePortal
              options={matrimoniale}
              renderInput={(params) => (
                <TextField {...params} label="Situation matrimoniale" />
              )}
              onChange={handleChangeAutocomplete("matrimoniale")}
            />
            <StyledAutocomplete
              id="loge"
              size="small"
              disablePortal
              options={loge}
              renderInput={(params) => (
                <TextField {...params} label="Logé à l'internat" />
              )}
              onChange={handleChangeAutocomplete("loge")}
            />
            <StyledTextField
              id="structure"
              label="Structure d'accueil"
              type="text"
              variant="outlined"
              size="small"
              name="structure"
              value={user.structure || member.user?.structure}
              onChange={handleChange}
            />
            <StyledTextField
              id="service"
              label="Service d'accueil"
              type="text"
              variant="outlined"
              size="small"
              name="service"
              value={user.service || member.user?.service}
              onChange={handleChange}
            />
            <StyledTextField
              id="holdPassword"
              label="Ancien mot de passe*"
              type="password"
              variant="outlined"
              autoComplete="false"
              size="small"
              name="holdPassword"
              value={user.holdPassword}
              onChange={handleChange}
            />
            <StyledTextField
              id="newPassword"
              label="Nouveau mot de passe*"
              type="password"
              variant="outlined"
              autoComplete="false"
              size="small"
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
            />
            <Stack direction="row" sx={{ width: "100%" }} gap={1}>
              <StyledButton
                variant="contained"
                color="success"
                disableElevation
                onClick={handleClick(member.user?._id)}
              >
                Modifier
              </StyledButton>
            </Stack>
          </Stack>
        </StyledStack>
      )}
    </>
  );
};
