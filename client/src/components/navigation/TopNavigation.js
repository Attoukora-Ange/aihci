import {
  AppBar,
  Toolbar,
  Menu,
  IconButton,
  Container,
  Typography,
  Avatar,
  Button,
  MenuItem,
  styled,
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Healing';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserContexte } from "../../context/UserContext";
import { CONNEXION } from "../../context/Action";
import axios from "axios";

const StyledTypography = styled(Typography)(({ theme }) => ({
  mr: 0,
  flex: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  [theme.breakpoints.down("md")]: {
    letterSpacing: "0rem",
    fontSize: "1rem",
  },
}));

const connects = [
  {
    text: "Connexion",
    lien: "/connexion",
  },
  {
    text: "Inscription",
    lien: "/inscription",
  },
];

const settings = [
  {
    text: "Profil",
    lien: "/utilisateur",
  },
  {
    text: "Déconnexion",
    lien: "",
  },
];

export const TopNavigation = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, dispatch } = useUserContexte();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataConnexion = await axios.post(`${process.env.REACT_APP_API}/user/deconnexion`, option);
      if (dataConnexion.status === 200)
        dispatch({
          type: CONNEXION,
          payload: null,
        });
      localStorage.setItem("token", null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#099e4c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ mr: 1 }} />
          <StyledTypography variant="h6" noWrap component={Link} to="/">
            AIHCI
          </StyledTypography>
          {user ? (
            <>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={user.nom_prenoms} src="/" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    {setting.text === "Profil" ? (
                      <Typography
                        component={Link}
                        to={setting.lien}
                        textAlign="center"
                        sx={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        {setting.text}
                      </Typography>
                    ) : (
                      <Typography textAlign="center" onClick={handleClick}>
                        {setting.text}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {connects.map((page, index) => (
                <Button
                  component={Link}
                  to={page.lien}
                  key={index}
                  sx={{ my: 2, color: "white", display: "block" }}
                  disableElevation
                  disableRipple
                >
                  {page.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
