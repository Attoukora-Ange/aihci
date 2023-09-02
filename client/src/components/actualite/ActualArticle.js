import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { HomeVideo } from "../home/HomeVideo";
import { HomeImage } from "../home/HomeImage";
import { HomeSoumission } from "../home/HomeSoumission";
import { HomeAgenda } from "../home/HomeAganda";
import { HomeArticleSelection } from "../home/HomeArticleSelection";
import { ActualArticleDetail } from "./ActualArticleDetail";
import { useDataContexte } from "../../context/DataContext";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#099e4c",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 30,
    margin: 50,
    padding: "10px",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: "10px",
    width: "100%",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

const StyledTypographyTitre = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 400,
  fontFamily: "Montserrat",
  color: "#099e4c",
  backgroundColor: "#f0f0f0",
  borderRadius: 10,
  marginTop: 20,
  textAlign: "left",
  padding: 10,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
    textAlign: "center",
  },
}));

export const ActualArticle = () => {
  const { state } = useDataContexte();
  const quatrePremier = state.agendas?.slice(0, 4);
  return (
    <Container
      sx={{
        mt: 1
      }}
      maxWidth="xl"
    >
      <StyledStack direction="row" justifyContent="space-between">
        <StyledBox flex={3}>
          <Container maxWidth="xl">
            <StyledTypography variant="h4" component="div">
              Articles
            </StyledTypography>
            {state.articles?.map((article) => (
              <Box key={article?._id}>
                {" "}
                <ActualArticleDetail art={article} />{" "}
              </Box>
            ))}
          </Container>
        </StyledBox>
        <Box flex={1}>
          <HomeVideo />
          <HomeImage />
          <HomeSoumission />
          <StyledTypographyTitre variant="h6" component="div">
              Agenda
            </StyledTypographyTitre>
            {quatrePremier?.map((agenda) => (
              <Box key={agenda?._id}>
                <HomeAgenda agend={agenda} />
              </Box>
            ))}
          <HomeArticleSelection />
        </Box>
      </StyledStack>
    </Container>
  );
};
