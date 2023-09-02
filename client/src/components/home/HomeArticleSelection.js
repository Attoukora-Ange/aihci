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

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 400,
  fontFamily: "Montserrat",
  color: "#099e4c",
  backgroundColor: "#f0f0f0",
  marginTop: 20,
  textAlign: "left",
  padding: 10,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
    textAlign: "center",
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  padding: 1,
  marginTop: 10,
  marginBottom: 10,
  alignItems: "flex-start",
  [theme.breakpoints.down("md")]: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  backgroundColor: "red",
  objectFit: "cover",
  width: 120,
  borderRadius: 2,
  height: "auto",
}));

export const HomeArticleSelection = () => {
  const { state } = useDataContexte();
  const trierArticlePlusLu = state.articles?.sort(
    (articlesA, articlesB) => articlesB.lu - articlesA.lu
  );
  const topTroisLu = trierArticlePlusLu?.slice(0, 5);

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <StyledTypography variant="h6" component="div">
        Articles plus lus
      </StyledTypography>
      {topTroisLu?.map((article) => (
        <Card
          key={article._id}
          elevation={0}
          component={Link}
          to={"/actualites/" + article._id}
          sx={{ textDecoration: "none" }}
        >
          <StyledCardActionArea disableRipple>
            <StyledCardMedia
              component="img"
              height={100}
              image={ article.fichier}
              alt={article.fichier}
            />
            <CardContent sx={{ pt: 0, overflow: "hidden" }}>
              <Typography
                variant="body2"
                fontFamily="Roboto"
                fontWeight={500}
                fontSize={12}
                color="text.primary"
              >
                {article.title}
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={400}
                fontFamily="Montserrat"
                fontSize={10}
                color="text.secondary"
              >
                {article.createdAt.split("T")[0]}{" "}
                {article.createdAt.split("T")[1].split(".")[0]} | lu :{" "}
                {article.lu} fois
              </Typography>
            </CardContent>
          </StyledCardActionArea>
        </Card>
      ))}
    </Box>
  );
};
