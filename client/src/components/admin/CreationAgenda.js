import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const StyledButton = styled(Button)(() => ({
  width: "100%",
}));

export const CreationAgenda = () => {
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();
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
        .post(
          `${process.env.REACT_APP_API}/post/agenda`,
          agenda,
          option
        )
        .then((res) => {
          setSucces("L'agenda a été ajouté avec succès");
          setAgenda({ title: "", date: "" });
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
      <StyledButton onClick={handleClick} variant="contained" color="success">
        Envoyez
      </StyledButton>
    </Stack>
  );
};
