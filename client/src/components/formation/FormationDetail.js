import {
  Box,
  Card,
  Stack,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  styled,
  Button,
} from "@mui/material";
import { useDataContexte } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { textCourt } from "../../context/useFonction";
import { useUserContexte } from "../../context/UserContext";
import { ALL_FORMATION } from "../../context/Action";
import axios from "axios";

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Roboto",
  marginTop: 0,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
    marginTop: 16,
    fontSize: 26,
    padding: 0,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontFamily: "Roboto",
  [theme.breakpoints.down("md")]: {
    display: "block",
    fontSize: 14,
    padding: 0,
  },
}));

const StyledTypographyDate = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  fontFamily: "Roboto",
  textAlign: "justify",
  marginTop: 10,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
    fontSize: 12,
    marginTop: 20,
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
  width: 150,
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
  },
}));

export const FormationDetail = () => {
  const { state, dispatch } = useDataContexte();
  const { user } = useUserContexte();

  const handleClickDelete = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataSupprimer = await axios.delete(
        `${process.env.REACT_APP_API}/post/formation/${id}`,
        option
      );
      if (dataSupprimer.status === 200) {
        const axiosFormation = async () => {
          const dataFormation = await axios.get(
            `${process.env.REACT_APP_API}/post/formation`,
            option
          );
          if (dataFormation.status === 200)
            dispatch({ type: ALL_FORMATION, payload: dataFormation.data.post });
        };
        axiosFormation();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      {state.formation?.map((form) => (
        <Card key={form._id} elevation={0} sx={{ my: 5 }}>
          <StyledCardActionArea disableRipple
            component={Link}
            to={form.fichier}
            target="_blank"
          >
            <StyledCardMedia
              component="img"
              height={200}
              image="/image/image_aihci.png"
              alt={form.title}
            />
            <CardContent sx={{ pt: 0 }}>
              <StyledTypographyTitle gutterBottom variant="h5" component="div">
                {form.title}
              </StyledTypographyTitle>
              <StyledTypography color="text.secondary">
                {textCourt(form.content)}...
              </StyledTypography>
              <StyledTypographyDate variant="subtitle2" color="text.secondary">
                {form.createdAd?.split("T")[0]}{" "}
                {form.createdAt?.split("T")[1].split(".")[0]} | Cliquez pour
                Télécharger
              </StyledTypographyDate>
            </CardContent>
          </StyledCardActionArea>
          {user?.isAdmin && (
            <Stack direction="row" gap={1} pb={2}>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={handleClickDelete(form._id)}
              >
                Supprimer
              </Button>
            </Stack>
          )}
        </Card>
      ))}
    </Box>
  );
};
