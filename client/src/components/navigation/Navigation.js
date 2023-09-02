import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FilterListIcon from "@mui/icons-material/FilterList";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContexte } from "../../context/UserContext";

const StyledPhone = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));
const StyledDeskTop = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const pagesAdmin = [
  {
    text: "Admin",
    icon: <SupervisorAccountIcon />,
    lien: "/administrateur",
  },
  {
    text: "Accueil",
    icon: <HomeIcon />,
    lien: "/",
  },
  {
    text: "Actualités",
    icon: <NewspaperIcon />,
    lien: "/actualites",
  },
  {
    text: "Formations",
    icon: <ImportContactsIcon />,
    lien: "/formation",
  },
  {
    text: "Organigramme",
    icon: <FilterListIcon />,
    lien: "/organigramme",
  },
  {
    text: "Contacts",
    icon: <ContactsIcon />,
    lien: "/contact",
  },
];
const pagesUser = [
  {
    text: "Accueil",
    icon: <HomeIcon />,
    lien: "/",
  },
  {
    text: "Actualités",
    icon: <NewspaperIcon />,
    lien: "/actualites",
  },
  {
    text: "Formations",
    icon: <ImportContactsIcon />,
    lien: "/formation",
  },
  {
    text: "Organigramme",
    icon: <FilterListIcon />,
    lien: "/organigramme",
  },
  {
    text: "Contacts",
    icon: <ContactsIcon />,
    lien: "/contact",
  },
];

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContexte();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: "auto", backgroundColor: "#099e4c" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user?.isAdmin ? (
        <List>
          {pagesAdmin.map((page, index) => (
            <ListItem
              key={index}
              component={Link}
              to={page.lien}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#fff" }}>{page.icon}</ListItemIcon>
                <ListItemText
                  primary={page.text}
                  sx={{ color: "#fff", textTransform: "uppercase" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {pagesUser.map((page, index) => (
            <ListItem
              key={index}
              component={Link}
              to={page.lien}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#fff" }}>{page.icon}</ListItemIcon>
                <ListItemText
                  primary={page.text}
                  sx={{ color: "#fff", textTransform: "uppercase" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#099e4c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledPhone>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon onClick={toggleDrawer(true)} />
            </IconButton>
            <>
              <SwipeableDrawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                {list()}
              </SwipeableDrawer>
            </>
          </StyledPhone>
          <StyledDeskTop>
            <>
              {user?.isAdmin ? (
                <>
                  {pagesAdmin.map((page, index) => (
                    <Button
                      component={Link}
                      to={page.lien}
                      key={index}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.text}
                    </Button>
                  ))}
                </>
              ) : (
                <>
                  {pagesUser.map((page, index) => (
                    <Button
                      component={Link}
                      to={page.lien}
                      key={index}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.text}
                    </Button>
                  ))}
                </>
              )}
            </>
          </StyledDeskTop>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
