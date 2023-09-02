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

export const CreationInfoImage = () => {
  const [fichier, setFichier] = useState(null);
  const [success, setSucces] = useState();
  const [erreur, setErreur] = useState();

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
    setSucces(null);
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
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
          `${process.env.REACT_APP_API}/post/image`,
          {
            image_descriptif: data.get("fichier"),
          },
          option
        )
        .then((res) => {
          setSucces("L'image a été ajouté avec succès");
          setErreur(null);
        })
        .catch((err) => {
          console.log(err);
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
        id="fichier"
        type="file"
        variant="outlined"
        size="small"
        onChange={handleFileChange}
      />
      <StyledButton onClick={handleClick} variant="contained" color="success">
        Envoyez
      </StyledButton>
    </Stack>
  );
};
