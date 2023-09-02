import {
  Box,
  Card,
  Stack,
  CardContent,
  Typography,
  TextField,
  CardActionArea,
  Button,
  styled,
} from "@mui/material";

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataContexte } from "../../context/DataContext";
import { ALL_AGENDA } from "../../context/Action";
import { useUserContexte } from "../../context/UserContext";

const StyledCardActionArea = styled(CardActionArea)(() => ({
  display: "flex",
  justifyContent: "start",
  gap: 5,
  marginTop: 10,
  alignItems: "flex-start",
}));

const StyledCardBox = styled(Box)(() => ({
  Width: "80px",
  borderRadius: 10,
  flexBasis: "60px",
  Height: "80px",
  color: "white",
  textAlign: "center",
  backgroundColor: "#07d",
  padding: 10,
  fontFamily: "Roboto",
  fontWeight: 500,
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

export const HomeAgenda = ({ agend }) => {
  const { dispatch } = useDataContexte();
  const { user } = useUserContexte();
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
  const [affichage, setAffichage] = useState(false);
  const [agenda, setAgenda] = useState({
    title: "",
    date: "",
  });

  const handleChange = (e) => {
    setAgenda((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSucces(null);
    setErreur(null);
  };

  const handleClickModifier = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      //On effectue une requette seulemnt lorsqu'on affiche le formulaire
      await axios
        .get(`${process.env.REACT_APP_API}/post/agenda/${id}`, option)
        .then((res) => {
          setAgenda({
            title: res.data.post.title,
            date: res.data.post.date,
          });
          setErreur(null);
          setSucces(null);
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

  const handleClickDelete = (id) => async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataSupprimer = await axios.delete(
        `${process.env.REACT_APP_API}/post/agenda/${id}`,
        option
      );
      if (dataSupprimer.status === 200) {
        const axiosAgenda = async () => {
          const dataAgenda = await axios.get(
            `${process.env.REACT_APP_API}/post/agenda`,
            option
          );
          if (dataAgenda.status === 200)
            dispatch({ type: ALL_AGENDA, payload: dataAgenda.data.post });
        };
        axiosAgenda();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClickAnnuler = () => {
    setAffichage(false);
    setAgenda({
      title: "",
      date: "",
    });
    setErreur("");
    setSucces("");
  };

  const handleClickEnvoyeMod = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios
        .put(`${process.env.REACT_APP_API}/post/agenda/${id}`, agenda, option)
        .then((res) => {
          setSucces(res.data.success);
          setAgenda({ title: "", date: "" });
          setErreur(null);
          setAffichage(false);

          //Recharger le contenu de l'agenda
          const axiosAgenda = async () => {
            const dataAgenda = await axios.get(
              `${process.env.REACT_APP_API}/post/agenda`,
              option
            );
            if (dataAgenda.status === 200)
              dispatch({ type: ALL_AGENDA, payload: dataAgenda.data.post });
          };

          axiosAgenda();
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
    <Box sx={{ width: "100%", my: 1, backgroundColor: "#f0f0f0" }}>
      <Box>
        <Card key={agend?._id} elevation={0}>
          <StyledCardActionArea disableRipple>
            <StyledCardBox component="div">
              {agend?.date.slice(0, 6)}.
            </StyledCardBox>
            <CardContent sx={{ pt: 0, overflow: "hidden" }}>
              <Typography
                variant="body2"
                fontFamily="Roboto"
                fontWeight={500}
                color="text.primary"
              >
                {agend?.title}
              </Typography>
              <Typography
                variant="body1"
                component={Link}
                to={"/agenda/" + agend?._id}
                fontWeight={500}
                sx={{ textDecoration: "none" }}
                color="#07d"
              >
                Plus d'infos
              </Typography>
            </CardContent>
          </StyledCardActionArea>
          {user?.isAdmin && (
            <>
              <Stack direction="row" gap={1} pb={2}>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={handleClickDelete(agend?._id)}
                >
                  Supprimer
                </Button>
                {!affichage && (
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => handleClickModifier(agend?._id)}
                  >
                    Modifier
                  </Button>
                )}
              </Stack>
              {affichage &&
                agendaFormMod({
                  agend,
                  erreur,
                  success,
                  agenda,
                  handleChange,
                  handleClickEnvoyeMod,
                  handleClickAnnuler,
                })}
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

//Formulaire de mofification de l'agenda
const agendaFormMod = ({
  agend,
  erreur,
  success,
  agenda,
  handleChange,
  handleClickEnvoyeMod,
  handleClickAnnuler,
}) => (
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
      label="Titre de l'agenda"
      type="text"
      variant="outlined"
      size="small"
      name="title"
      value={agenda.title}
      onChange={handleChange}
    />
    <StyledTextField
      id="date"
      type="text"
      label="Date de l'agenda"
      variant="outlined"
      size="small"
      name="date"
      value={agenda.date}
      onChange={handleChange}
    />
    <Stack gap={1} direction="row">
      <StyledButton
        onClick={handleClickEnvoyeMod(agend?._id)}
        variant="contained"
        color="success"
      >
        Modifier
      </StyledButton>
      <StyledButton
        onClick={handleClickAnnuler}
        variant="contained"
        color="error"
      >
        Annuler
      </StyledButton>
    </Stack>
  </Stack>
);
