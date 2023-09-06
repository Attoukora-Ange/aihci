import {
  Box,
  CardActionArea,
  Container,
  Typography,
  styled,
  Card,
  CardMedia,
} from "@mui/material";
import { useDataContexte } from "../../context/DataContext";

const StyledTypography = styled(Typography)(({ theme }) => ({
  position: "absolute",
  fontSize: 28,
  bottom: 0,
  color: "white",
  padding: 10,
  fontWeight: 500,
  fontFamily: "Montserrat",
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  marginTop: 10,
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  height: 500,
  overflow: "hidden",
  margin: 1,
  [theme.breakpoints.down("md")]: {
    height: 300,
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 500,
  overflow: "hidden",
  objectFit: "cover",
  cursor: "auto",
  [theme.breakpoints.down("md")]: {
    height: 300,
    width: "100%",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: 500,
  textDecoration: "none",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const HomeHeader = () => {
  const { state } = useDataContexte();
  const troisPremier = state.articles?.slice(0, 3);
  return (
    <StyledContainer maxWidth="xl">
      {troisPremier?.map((article) => (
        <StyledBox key={article._id} position="relative">
          <StyledCard component={Link} to={"/actualites/" + article._id}>
            <CardActionArea disableRipple disableTouchRipple>
              <StyledCardMedia
                component="img"
                image={article.fichier}
                alt={article.title}
              />
            </CardActionArea>
          </StyledCard>
          <StyledTypography gutterBottom variant="h5" component="div">
            {article.title}
          </StyledTypography>
        </StyledBox>
      ))}
    </StyledContainer>
  );
};
