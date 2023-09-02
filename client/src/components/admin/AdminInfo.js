import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { CreationArticle } from "./CreationArticle";
import { CreationInfoImage } from "./CreationInfoImage";
import { CreationOrganigrame } from "./CreationOrganigrame";
import { CreationFormation } from "./CreationFormation";
import { CreationAgenda } from "./CreationAgenda";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 24,
    padding: "10px",
    marginLeft: 0,
    marginTop: 20,
    marginBottom: "10px",
    width: "100%",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export const AdminInfo = () => {
  return (
    <StyledStack direction="row">
      <StyleBox flex={1} flexWrap="wrap">
        <Container maxWidth="xl">
          <StyledTypography variant="h4" component="div">
            Création d'article
          </StyledTypography>
          <CreationArticle />
        </Container>
        <Container maxWidth="xl">
          <StyledTypography variant="h4" component="div">
            Création d'info en image
          </StyledTypography>
          <CreationInfoImage />
        </Container>
        <Container maxWidth="xl">
          <StyledTypography variant="h4" component="div">
            Création d'organigramme
          </StyledTypography>
          <CreationOrganigrame />
        </Container>
      </StyleBox>
      <StyleBox flex={1} flexWrap="wrap">
        <Container maxWidth="xl">
          <StyledTypography variant="h4" component="div">
            Création de formation
          </StyledTypography>
          <CreationFormation />
        </Container>
        <Container maxWidth="xl">
          <StyledTypography variant="h4" component="div">
            Création d'agenda
          </StyledTypography>
          <CreationAgenda />
        </Container>
      </StyleBox>
    </StyledStack>
  );
};
