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

export const CreationFormation = () => {
  const [fichier, setFichier] = useState(null);
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
  const [formation, setFormation] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSucces(null);
    setErreur(null);
  };

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
    setSucces(null);
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", formation.title);
    data.set("content", formation.content);
    data.set("fichier", fichier);

    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/post/formation`,
          {
            title: data.get("title"),
            content: data.get("content"),
            image_formation: data.get("fichier"),
          },
          option
        )
        .then((res) => {
          setSucces("La formation a été ajouté avec succès");
          setFormation({ content: "", title: "" });
          setErreur(null);
        })
        .catch((err) => {
          console.log(err);
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
        id="title"
        label="Titre de la formation"
        type="text"
        variant="outlined"
        size="small"
        name="title"
        value={formation.title}
        onChange={handleChange}
      />
      <StyledTextField
        id="content"
        label="Contenu de la formation"
        type="text"
        variant="outlined"
        size="small"
        multiline
        rows={6}
        name="content"
        value={formation.content}
        onChange={handleChange}
      />
      <StyledTextField
        id="fichier"
        type="file"
        variant="outlined"
        size="small"
        name="fichier"
        onChange={handleFileChange}
      />
      <StyledButton onClick={handleClick} variant="contained" color="success">
        Envoyez
      </StyledButton>
    </Stack>
  );
};
