import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  styled,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataContexte } from "../../context/DataContext";
import { textCourt } from "../../context/useFonction";
import { useUserContexte } from "../../context/UserContext";
import { ALL_ARTICLES } from "../../context/Action";

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Roboto",
  marginTop: 0,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
    marginTop: 5,
    fontSize: 16,
    padding: 0,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontFamily: "Roboto",
  [theme.breakpoints.down("md")]: {
    display: "block",
    fontSize: 13,
    padding: 0,
  },
}));

const StyledTypographyDate = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  fontFamily: "Roboto",
  marginTop: 10,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
    fontSize: 13,
    marginTop: 5,
    padding: 0,
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  padding: 1,
  alignItems: "flex-start",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: "cover",
  borderRadius: 2,
  height: "auto",
  width: 250,
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
  },
}));

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

export const ActualArticleDetail = ({ art }) => {
  const { dispatch } = useDataContexte();
  const { user } = useUserContexte();
  const [fichier, setFichier] = useState(null);
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
  const [affichage, setAffichage] = useState(false);
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

  //A partir de la requettrempli le formulaire des informations de l'article
  const handleClickModifier = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      // affichage && //On effectue une requette seulemnt lorsqu'on affiche le formulaire
      await axios
        .get(`${process.env.REACT_APP_API}/post/article/${id}`, option)
        .then((res) => {
          setArticle({
            title: res.data.post.title,
            content: res.data.post.content,
          });
          setAffichage(true);
        })
        .catch((err) => {
          console.log(err);
          setErreur(err.response.data.error);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //Supprimer un article de la base de données
  const handleClickDelete = (id) => async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataSupprimer = await axios.put(
        `${process.env.REACT_APP_API}/post/article/${id}`,
        option
      );
      if (dataSupprimer.status === 200) {
        const axiosArticle = async () => {
          const dataArticle = await axios.get(
            `${process.env.REACT_APP_API}/post/article`,
            option
          );
          if (dataArticle.status === 200)
            dispatch({ type: ALL_ARTICLES, payload: dataArticle.data.post });
        };
        axiosArticle().catch((err) => console.log(err.message));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //Masquer le formulaire de modification
  const handleClickAnnuler = () => {
    setAffichage(false);
    setArticle({ title: "", content: "" });
    setErreur("");
    setSucces("");
  };

  //Envoyer la modification au server
  const handleClick = (id) => async (e) => {
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
      const axiosPutData = await axios.put(
        `${process.env.REACT_APP_API}/post/article/${id}`,
        {
          title: data.get("title"),
          content: data.get("content"),
          image_article: data.get("fichier"),
        },
        option
      );

      if (axiosPutData.status === 200) {
        setSucces("L'article a été modifié avec succès");
        setArticle({ content: "", title: "" });
        setErreur(null);

        const axiosArticle = async () => {
          const dataArticle = await axios.get(
            `${process.env.REACT_APP_API}/post/article`,
            option
          );
          if (dataArticle.status === 200)
            dispatch({ type: ALL_ARTICLES, payload: dataArticle.data.post });
        };
        axiosArticle().catch((err) => console.log(err.message));
        setAffichage(false);
      }
    } catch (err) {
      console.log(err.response.data);
      setErreur(err.response.data.error || err.response.data.postExist);
    }
  };

  return (
    <>
      <Box key={art._id} sx={{ width: "100%" }}>
        <Card
          elevation={0}
          sx={{ my: 5, textDecoration: "none" }}
          component={Link}
          to={"/actualites/" + art._id}
        >
          <StyledCardActionArea disableRipple>
            <StyledCardMedia
              component="img"
              height={200}
              image={art.fichier}
              alt={art.title}
            />
            <CardContent sx={{ pt: 0 }}>
              <StyledTypographyTitle gutterBottom variant="h5" component="div">
                {art.title}
              </StyledTypographyTitle>
              <StyledTypography color="text.secondary">
                {textCourt(art.content)}...
              </StyledTypography>
              <StyledTypographyDate variant="subtitle2" color="text.secondary">
                {art.createdAt.split("T")[0]}{" "}
                {art.createdAt.split("T")[1].split(".")[0]} | lu : {art.lu} fois
              </StyledTypographyDate>
            </CardContent>
          </StyledCardActionArea>
        </Card>
        {user?.isAdmin && (
          <Stack direction="row" gap={1} pb={2}>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleClickDelete(art._id)}
            >
              Supprimer
            </Button>
            {!affichage && (
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => handleClickModifier(art._id)}
              >
                Modifier
              </Button>
            )}
          </Stack>
        )}
      </Box>
      {affichage &&
        modifierArticle({
          art,
          erreur,
          success,
          article,
          handleChange,
          handleFileChange,
          handleClick,
          handleClickAnnuler,
        })}
    </>
  );
};

//Formulaire de mofification de l'article
const modifierArticle = ({
  art,
  erreur,
  success,
  article,
  handleChange,
  handleFileChange,
  handleClick,
  handleClickAnnuler,
}) => (
  <Stack pb={2} gap={1} justifyContent="center" component="form">
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
    <Stack gap={1} direction="row">
      <StyledButton
        variant="contained"
        color="success"
        onClick={handleClick(art._id)}
      >
        Modifier
      </StyledButton>
      <StyledButton
        variant="contained"
        color="error"
        onClick={handleClickAnnuler}
      >
        Annuler
      </StyledButton>
    </Stack>
  </Stack>
);
