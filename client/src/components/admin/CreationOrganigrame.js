import TextField from "@mui/material/TextField";
import { Button, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const CreationOrganigrame = () => {
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
  const [organigramme, setOrganigramme] = useState({
    fonction: "",
    responsable: "",
  });

  const handleChange = (e) => {
    setOrganigramme((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSucces(null);
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios
        .post(`${process.env.REACT_APP_API}/post/organigramme`, organigramme, option)
        .then(() => {
          setSucces("Le membre a été ajouté avec succès");
          setOrganigramme({ fonction: "", responsable: "" });
          setErreur(null);
        })
        .catch((err) => {
          setSucces(null);
          setErreur(err.response.data.error || err.response.data.postExist);
        });
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
          textAlign="center"
          color="red"
        >
          {erreur}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          component="div"
          textAlign="center"
          color="green"
        >
          {success}
        </Typography>
      )}
      <StyledTextField
        id="fonction"
        label="Fonction du membre"
        type="text"
        variant="outlined"
        size="small"
        name="fonction"
        value={organigramme.fonction}
        onChange={handleChange}
      />
      <StyledTextField
        id="responsable"
        label="Nom du responsable"
        type="text"
        variant="outlined"
        size="small"
        name="responsable"
        value={organigramme.responsable}
        onChange={handleChange}
      />
      <StyledButton onClick={handleClick} variant="contained" color="success">
        Envoyez
      </StyledButton>
    </Stack>
  );
};
