import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { SoumissionDetail } from "./SoumissionDetail";


const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  textAlign: "center",
  color: "#099e4c",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 5,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
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

export const SoumissionInfo = () => {
  return (
    <>
      <StyledStack direction="column">
        <StyleBox flex={1}>
          <Container maxWidth="xl">
            <StyledTypography variant="h4" component="div">
              Soumission article
            </StyledTypography>
            <SoumissionDetail />
          </Container>
        </StyleBox>
      </StyledStack>
    </>
  );
};

