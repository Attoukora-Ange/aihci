import { Button, Stack, TextField, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { CONNEXION } from "../../context/Action";
import { useUserContexte } from "../../context/UserContext";
import { isValidEmail } from "../../context/useFonction";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  width: 600,
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

export const LoginDetail = () => {
  const { dispatch } = useUserContexte();
  const [erreur, setErreur] = useState();
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErreur(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const option = {};

    try {
      if (!isValidEmail(user.email)) return setErreur("Email n'est pas valide");

      const dataConnexion = await axios.post(
        `${process.env.REACT_APP_API}/user/connexion`,
        user,
        option
      );

      if (dataConnexion.status === 200)
        dispatch({
          type: CONNEXION,
          payload: dataConnexion.data.user,
        });

      localStorage.setItem("token", JSON.stringify(dataConnexion.data.token));
      navigate("/");
    } catch (error) {
      setErreur(error.response.data.error || error.response.data.userExist);
    }
  };

  return (
    <Stack gap={1} justifyContent="center" component="form">
      <Typography variant="body2" component="div" textAlign="center" color="red">
        {erreur}
      </Typography>
      <StyledTextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        size="small"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <StyledTextField
        id="password"
        label="Mot de passe"
        type="password"
        variant="outlined"
        size="small"
        name="password"
        autoComplete="false"
        value={user.password}
        onChange={handleChange}
      />
      <StyledButton
        variant="contained"
        color="success"
        disableElevation
        onClick={handleClick}
      >
        Connexion
      </StyledButton>
      <StyledLink to="/inscription">Pas de compte ? Je m'inscrit</StyledLink>
    </Stack>
  );
};
