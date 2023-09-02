import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDataContexte } from "../../context/DataContext";
import { textCourt } from "../../context/useFonction";

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

export const HomeBodyAussi = () => {
  const { state } = useDataContexte();
  const cinqPremier = state.articles?.slice(0, 5);

  return (
    <>
      {cinqPremier?.map((article) => (
        <Box key={article._id} sx={{ width: "100%" }}>
          <Card
            elevation={0}
            sx={{ textDecoration: "none" }}
            component={Link}
            to={"/actualites/" + article._id}
          >
            <StyledCardActionArea disableRipple>
              <StyledCardMedia
                component="img"
                height={200}
                image={article.fichier}
                alt={article.fichier}
              />
              <CardContent sx={{ pt: 0 }}>
                <StyledTypographyTitle
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {article.title}
                </StyledTypographyTitle>
                <StyledTypography color="text.secondary">
                  {textCourt(article.content)}...
                </StyledTypography>
                <StyledTypographyDate
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {article.createdAt.split("T")[0]}{" "}
                  {article.createdAt.split("T")[1].split(".")[0]} | lu :{" "}
                  {article.lu} fois
                </StyledTypographyDate>
              </CardContent>
            </StyledCardActionArea>
          </Card>
        </Box>
      ))}
    </>
  );
};
