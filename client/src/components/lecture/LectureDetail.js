import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  styled,
  Box,
} from "@mui/material";
import { useDataContexte } from "../../context/DataContext";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 26,
  fontWeight: 600,
  fontFamily: "Montserrat",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 24,
    marginLeft: 0,
    marginTop: 0,
    width: "100%",
  },
}));

const StyledTypographyDate = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  fontFamily: "Montserrat",
  paddingTop: 1,
  marginTop: 5,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    width: "100%",
  },
}));

const StyledTypographyTexte = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  fontFamily: "Montserrat",
  marginTop: 25,
  marginBottom: 5,
  whiteSpace: "pre-wrap",
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
    width: "100%",
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
  width: "50%",
  [theme.breakpoints.down("md")]: {
    display: "block",
    width: "100%",
  },
}));

export const LectureDetail = () => {
  const { state } = useDataContexte();
  return (
    <>
      <StyledTypography variant="h4" component="div">
        {state.article?.title}
      </StyledTypography>
      <StyledTypographyDate>
        {state.article?.createdAt.split("T")[0]}{" "}
        {state.article?.createdAt.split("T")[1].split(".")[0]} | lu :{" "}
        {state.article?.lu} fois
      </StyledTypographyDate>
      <Card
        elevation={0}
        sx={{ my: 5, textDecoration: "none" }}
        component={Box}
      >
        <StyledCardActionArea disableRipple sx={{ cursor: "auto" }}>
          <StyledCardMedia
            component="img"
            height={200}
            image={state.article?.fichier}
            alt={state.article?.title}
          />
        </StyledCardActionArea>
      </Card>
      <StyledTypographyTexte>{state.article?.content}</StyledTypographyTexte>
    </>
  );
};
