import { Container, Typography, styled } from "@mui/material";
import { Layout } from "../components/layout/Layout";

const StyledTypographyNumber = styled(Typography)(({ theme }) => ({
  fontSize: 100,
  fontWeight: 700,
  fontFamily: "Montserrat",
  color: "red",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 50,
    width: "100%",
  },
}));

const StyledTypographyText1 = styled(Typography)(({ theme }) => ({
  fontSize: 50,
  fontWeight: 500,
  fontFamily: "Montserrat",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 30,
    width: "100%",
  },
}));

const StyledTypographyText2 = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 14,
    width: "100%",
  },
}));

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "65vh",
}));

export const PageNotFound = () => {
  return (
    <Layout>
      <StyledContainer maxWidth="xl">
        <StyledTypographyNumber>404</StyledTypographyNumber>
        <StyledTypographyText1>Page non trouvée</StyledTypographyText1>
        <StyledTypographyText2>
          Nous sommes désolée, la page que vous recherchée n'existe pas sur
          notre site web !
        </StyledTypographyText2>
      </StyledContainer>
    </Layout>
  );
};
