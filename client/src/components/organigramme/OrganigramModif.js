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

export const OrganigramModif = ({organ}) => {
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

  const handleClick = (id)=>  async (e) => {

    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios
        .put(`${process.env.REACT_APP_API}/post/organigramme/${id}`, organigramme, option)
        .then((resp) => {
          setSucces(resp.data.success);
          setOrganigramme({ fonction: "", responsable: "" });
          setErreur(null);
          organ.setAffichage(true);
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
    <Stack gap={1} mt={2} justifyContent="center" component="form">
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
        value={organigramme.fonction || organ.organigramme?.fonction}
        onChange={handleChange}
      />
      <StyledTextField
        id="responsable"
        label="Nom du responsable"
        type="text"
        variant="outlined"
        size="small"
        name="responsable"
        value={organigramme.responsable || organ.organigramme?.responsable}
        onChange={handleChange}
      />
      <StyledButton onClick={handleClick(organ.organigramme?._id)} variant="contained" color="success">
        Modifier
      </StyledButton>
    </Stack>
  );
};
