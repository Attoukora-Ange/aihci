import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { HomeBodyAussi } from "./HomeBodyAussi";
import { HomeBodyPlus } from "./HomeBodyPlus";
import { BasComposant } from "../../context/BasComposant";

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

export const HomeContent = () => {
  return (
      <Container
        sx={{
          mt: 1,
        }}
        maxWidth="xl"
      >
        <StyledStack direction="row" justifyContent="space-between">
          <StyledBox flex={3}>
            <Container maxWidth="xl">
              <StyledTypography variant="h4" component="div" sx={{ mt: 5 }}>
                Lire aussi
              </StyledTypography>
              <HomeBodyAussi />
              <StyledTypography variant="h4" component="div" sx={{ mt: 5 }}>
                Articles sélectionés
              </StyledTypography>
              <HomeBodyPlus />
            </Container>
          </StyledBox>
          <BasComposant />
        </StyledStack>
      </Container>
  );
};
