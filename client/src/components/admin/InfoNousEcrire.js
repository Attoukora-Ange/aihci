import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { Layout } from "../layout/Layout";
import { InfoNousEcrireDetail } from "./InfoNousEcrireDetail";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#099e4c",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  textAlign: "center",
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    fontSize: 24,
    padding: "10px",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: "10px",
    width: "100%",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
  minHeight:"60vh",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export const InfoNousEcrire = () => {
  return (
    <Layout>
      <StyledStack direction="column">
        <StyleBox flex={1}>
          <Container maxWidth="xl">
            <StyledTypography variant="h4" component="div">
              Messages réçus
            </StyledTypography>
            <InfoNousEcrireDetail />
          </Container>
        </StyleBox>
      </StyledStack>
    </Layout>
  );
};
