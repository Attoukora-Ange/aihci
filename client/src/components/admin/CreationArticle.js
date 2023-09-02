import TextField from "@mui/material/TextField";
import { Button, Stack, Typography, styled } from "@mui/material";
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

export const CreationArticle = () => {
  const [fichier, setFichier] = useState(null);
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setArticle((prev) => ({
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
    data.set("title", article.title);
    data.set("content", article.content);
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
          `${process.env.REACT_APP_API}/post/article`,
          {
            title: data.get("title"),
            content: data.get("content"),
            image_article: data.get("fichier"),
          },
          option
        )
        .then((res) => {
          setSucces("L'article a été ajouté avec succès");
          setArticle({ content: "", title: "" });
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
        label="Titre de l'article"
        type="text"
        variant="outlined"
        size="small"
        name="title"
        value={article.title}
        onChange={handleChange}
      />
      <StyledTextField
        id="content"
        label="Contenu de l'article"
        type="text"
        variant="outlined"
        size="small"
        multiline
        rows={6}
        name="content"
        value={article.content}
        onChange={handleChange}
      />
      <StyledTextField
        id="fichier"
        type="file"
        variant="outlined"
        size="small"
        name="image_article"
        onChange={handleFileChange}
      />
      <StyledButton variant="contained" color="success" onClick={handleClick}>
        Envoyez
      </StyledButton>
    </Stack>
  );
};
